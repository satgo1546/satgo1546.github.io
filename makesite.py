#!/usr/bin/env python

# This script is distributed under the MIT License.
#
# Copyright (c) 2024 Frog Chen
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
# CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
# TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
# Note that however, other files in this repository,
# including articles, images, and stylesheets, are all rights reserved.


import os
import posixpath
import shutil
import re
import glob
import sys
import datetime
import subprocess
import email.utils
from dataclasses import dataclass, field
from collections import defaultdict
from collections.abc import Iterable
import bs4
import pygments


def h(name: str, /, *children: bs4.PageElement | str, **attrs: str) -> bs4.Tag:
    # It's unfortunate that creating HTML templates in BeautifulSoup is both verbose and untyped, so that I have to write wrapper for it.
    tag = bs4.Tag(
        name=name,
        attrs={key.strip("_").replace("_", "-"): value for key, value in attrs.items()},
    )
    tag.extend(children)
    return tag


def slugify(x: str, /) -> str:
    # We exclude characters that cannot be in a filename only.
    x = re.sub(r"[\\/:*?\"<>| !@#$%^&`'{}-]+", "-", x).strip("-")
    # Avoid clashes with index.html.
    if x == "index":
        x += "_"
    return x


@dataclass(order=True)
class Revision:
    date: datetime.datetime
    author: str
    commit_hash: str


@dataclass(order=True)
class Page:
    path: str
    """Filename relative to the website root.
    If the path ends with "index.html", that part should be omitted.
    Therefore, the root of the website has a path of "".
    """
    soup: bs4.BeautifulSoup
    revisions: list[Revision] = field(default_factory=list)
    title: str = "?"
    authors: list[str] = field(default_factory=list)
    description: list[bs4.PageElement] = field(default_factory=list)
    keywords: list[str] = field(default_factory=list)  # also called tags in blogs


def new_page(path: str, title: str) -> Page:
    soup = bs4.BeautifulSoup("<main>", "html5lib")
    head = soup.find("head")
    assert isinstance(head, bs4.Tag)
    head.append(
        h(
            "link",
            rel="stylesheet",
            href=posixpath.relpath("base.css", posixpath.dirname(path)),
        )
    )
    return Page(path, soup, title=title)


def read_page(filename: str) -> Page:
    """Read an HTML source from the file system, and build a Page with metadata filled."""
    path = filename.replace("\\", "/")
    if posixpath.basename(path) == "index.html":
        path = path.removesuffix("index.html")
    with open(filename, "rb") as file:
        page = Page(path, bs4.BeautifulSoup(file, "html5lib"))
    head = page.soup.find("head")
    assert isinstance(head, bs4.Tag)  # ensured by html5lib
    if title := head.find("title"):
        assert isinstance(title, bs4.Tag)
        page.title = title.get_text(strip=True)
        # A more comprehensive title would be added later; remove the element for now.
        title.decompose()
    if keywords := head.find("meta", {"name": "keywords", "content": True}):
        assert isinstance(keywords, bs4.Tag)
        keywords = keywords["content"]
        assert isinstance(keywords, str)
        page.keywords = keywords.split(",")
    page.revisions = sorted(
        Revision(datetime.datetime.fromisoformat(date), author, hash)
        for commit in subprocess.check_output(
            ["git", "log", "--pretty=format:%aI%x1f%aN%x1f%H", filename],
            encoding="utf-8",
        )
        .strip()
        .splitlines()
        for date, author, hash in (commit.split("\x1f"),)
    )
    page.authors = list(dict.fromkeys(revision.author for revision in page.revisions))
    # 本站设定：在每篇文章中任选一句话作为简介。
    if main := page.soup.find("main"):
        if mark := main.find("mark"):
            assert isinstance(mark, bs4.Tag)
            page.description = mark.contents
    return page


def append_list(path: str, title: str, children: Iterable[Page]) -> None:
    if path in pages:
        index = pages[path]
        index.title = index.title or title
    else:
        index = new_page(path, title)
        pages[path] = index
    if main := index.soup.find("main"):
        assert isinstance(main, bs4.Tag)
        main.append(
            h(
                "nav",
                h(
                    "ul",
                    *(
                        h(
                            "li",
                            h(
                                "a",
                                page.title or page.path,
                                href=posixpath.relpath(
                                    page.path, posixpath.dirname(index.path)
                                ),
                            ),
                            h(
                                "time",
                                page.revisions[-1].date.isoformat(" "),
                                datetime=page.revisions[-1].date.isoformat(),
                            )
                            if page.revisions
                            else "",
                            h("blockquote", *page.description)
                            if page.description
                            else "",
                        )
                        for page in children
                    ),
                ),
            )
        )
    path.removesuffix(".html") + ".rss"
    email.utils.format_datetime


def make_keywords() -> None:
    keywords = defaultdict[str, list[Page]](list)
    for page in pages.values():
        for keyword in page.keywords:
            keywords[keyword].append(page)
    for keyword in keywords:
        append_list(f"keyword/{slugify(keyword)}.html", keyword, keywords[keyword])


def make_indices() -> None:
    indices = defaultdict[str, list[Page]](list)
    for path, page in pages.items():
        indices[""].append(page)
        for ancestor in re.finditer(r"(?<!^)/(?!$)", path):
            indices[path[: ancestor.end()]].append(page)
    for path, descendant in indices.items():
        append_list(path, f"{path} 的子页面", descendant)


def hydrate_page(page: Page) -> None:
    """Highlight code in the page."""
    for xmp in page.soup.find_all("xmp"):
        assert isinstance(xmp, bs4.Tag)
        if language := xmp.get("language"):
            # TODO
            xmp.string
            pygments.highlight
            # if shell session then change to samp
            xmp.replace_with(h("pre", h("code", class_=f"language-{language}")))
        else:
            xmp.name = "pre"


def decorate_page(page: Page) -> None:
    head = page.soup.find("head")
    assert isinstance(head, bs4.Tag)
    head.insert(0, h("meta", charset="utf-8"))
    head.insert(
        1, h("title", " · ".join(filter(None, (page.title, "satgo1546’s ocean"))))
    )
    head.append(
        h(
            "meta",
            name="viewport",
            content="width=device-width, initial-scale=1, viewport-fit=cover",
        )
    )
    head.append(
        h(
            "link",
            rel="icon",
            href=posixpath.relpath("icon.png", posixpath.dirname(page.path)),
        )
    )
    head.append(h("meta", http_equiv="X-UA-Compatible", content="IE=edge"))

    body = page.soup.find("body")
    assert isinstance(body, bs4.Tag)
    body.insert(0, h("header", h("h1", "satgo1546's ocean")))
    body.append(h("nav", h("ul", h("li", h("a", "导航条")))))
    body.append(h("aside", "侧边栏"))
    body.append(h("footer", "Copyright © 2013–2024 Frog Chen. All rights reserved."))
    if main := body.find("main"):
        assert isinstance(main, bs4.Tag)
        if page.title:
            main.insert(0, h("h1", page.title))
        main.append(
            h(
                "section",
                *(
                    h(
                        "div",
                        h(
                            "a",
                            revision.commit_hash[:7],
                            href=f"https://github.com/satgo1546/satgo1546.github.io/commit/{revision.commit_hash}",
                        ),
                        h(
                            "time",
                            revision.date.isoformat(" "),
                            datetime=revision.date.isoformat(),
                        ),
                        h("span", revision.author),
                    )
                    for revision in page.revisions
                ),
                class_="revisions",
            )
        )
        main.append(
            h("ul", *(h("li", author) for author in page.authors), class_="authors")
        )


# Create a new _site directory from scratch.
if os.path.isdir("_site"):
    shutil.rmtree("_site")
pages = {
    page.path: page
    for page in sorted(
        map(read_page, glob.iglob("**/*.html", recursive=True)), reverse=True
    )
}
shutil.copytree(".", "_site")
make_keywords()
make_indices()
for page in pages.values():
    hydrate_page(page)
    decorate_page(page)
    os.makedirs("_site/" + posixpath.dirname(page.path), exist_ok=True)
    with open(re.sub(r"/$", "/index.html", "_site/" + page.path), "wb") as f:
        f.write(b"<!DOCTYPE html>")
        f.write(page.soup.encode())

match sys.argv:
    case [_, "serve"]:
        subprocess.run([sys.executable, "-m", "http.server"], cwd="_site")
