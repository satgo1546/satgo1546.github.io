if (!import.meta.main) {
	throw new Error('should not import this script as a module')
}

import * as readline from 'node:readline/promises'
import process from 'node:process'
import fs from 'node:fs/promises'
import { execSync } from 'node:child_process'
import secrets from './secrets.json' with { type: 'json' }

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const spec = await rl.question('/t/topic/? ')
rl.close()

let id = 0
for (const name of await fs.readdir('archives')) {
	const match = name.match(/^(\d+)(?:\.[^\.]*)?$/)
	if (match) id = Math.max(id, +match[1])
}
id += Math.random() * 11 + 4 | 0
await fs.mkdir('archives/' + id)

let date = new Date().toISOString().slice(0, 10)
let dates = '~ ' + date
let content = ''

if (/^\d+\/\d+$/.test(spec)) {
	const post = await (await fetch(new URL(`/posts/by_number/${spec}.json`, secrets.DISCOURSE_INSTANCE), {
		headers: {
			Accept: 'application/json',
			'User-Api-Key': secrets.DISCOURSE_USER_API_KEY,
		},
	})).json()
	date = post.updated_at.slice(0, 10)
	const createdAt = post.created_at.slice(0, 10)
	dates = createdAt === date ? date : `${createdAt} ~ ${date}`
	content = post.raw.trim() + '\n'
	const map = new Map<string, string>
	for (const [uploadURL, shortName] of content.matchAll(/upload:\/\/(\w+.\w+)/g)) {
		console.log('downloading', shortName)
		const response = await fetch(new URL('/uploads/short-url/' + shortName, secrets.DISCOURSE_INSTANCE), {
			headers: {
				'User-Api-Key': secrets.DISCOURSE_USER_API_KEY,
			}
		})
		const match = response.headers.get('Content-Disposition')?.match(/\bfilename\s*\*=\s*UTF-8''([^\s;]*)/)
		let filename = match ? decodeURIComponent(match[1]) : shortName
		if (/\.png$/i.test(filename)) {
			filename = filename.replace(/\.png$/, '.webp')
			const tempfile = crypto.randomUUID()
			await fs.writeFile(tempfile + '.png', await response.bytes())
			console.log('compressing', filename)
			execSync(`cwebp -z 9 ${tempfile}.png -o ${tempfile}.webp`)
			await fs.unlink(tempfile + '.png')
			await fs.rename(tempfile + '.webp', `archives/${id}/${filename}`)
		} else {
			await fs.writeFile(`archives/${id}/${filename}`, await response.bytes())
		}
		map.set(uploadURL, filename)
	}
	content = content.replace(/upload:\/\/\w+.\w+/g, uploadURL => map.get(uploadURL)!)
}

await fs.writeFile(`archives/${id}/index.md`, `---
title: 单击此处添加标题
date: ${date}
dates: ${dates}
excerpt: 单击此处添加文本
tags:
- 闲聊
---

${content}`)
console.log(await fs.realpath(`archives/${id}/index.md`))

// Dangling promises? Dunno why, but whatever.
process.exit()
