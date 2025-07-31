import { readDirSync } from 'jsr:@std/fs@1.0.19/unstable-read-dir'

export default function () {
	let max = 0
	for (const dirEntry of readDirSync('archives')) {
		const match = dirEntry.name.match(/^(\d+)(?:\.[^\.]*)?$/)
		if (match) max = Math.max(max, +match[1])
	}
	return {
		path: `/archives/${max + Math.random() * 11 + 4 | 0}/index.md`,
		content: `---
title: 单击此处添加标题
date: ${new Date().toISOString().slice(0, 10)}
dates: ~ ${new Date().toISOString().slice(0, 10)}
excerpt: 单击此处添加文本
tags:
- 闲聊
---

`,
	}
}
