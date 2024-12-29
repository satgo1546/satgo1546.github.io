import lume from "lume/mod.ts"
import feed from "lume/plugins/feed.ts"
import jsx_preact from "lume/plugins/jsx_preact.ts"
import nav from "lume/plugins/nav.ts"
import redirects from "lume/plugins/redirects.ts"
import relative_urls from "lume/plugins/relative_urls.ts"
import sass from "lume/plugins/sass.ts"

const site = lume()

site.use(feed())
site.use(jsx_preact())
site.use(nav())
site.use(redirects())
site.use(relative_urls())
site.use(sass())

export default site
