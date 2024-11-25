// @ts-check
import path from 'node:path'
import * as sass from 'sass'
import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'
import markdownIt from 'markdown-it'
import markdownItDeflist from 'markdown-it-deflist'
import highlightPlugin from './highlight.js'

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default eleventyConfig => {
	eleventyConfig.setServerPassthroughCopyBehavior('passthrough')
	eleventyConfig.setDataFileBaseName('index')
	eleventyConfig.addGlobalData('layout', 'layout')
	eleventyConfig.addGlobalData('title', '<i>无标题</i>')
	eleventyConfig.addGlobalData('theme', 'theme-modern-magic light')
	eleventyConfig.addGlobalData('lang', 'zh-Hans')
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			'_components/**/*.html',
		],
	})
	eleventyConfig.addTemplateFormats([
		'jpg', 'png', 'gif', 'bmp', 'svg', 'webp', 'avif',
		'mp3', 'ogg',
		'ttf', 'otf', 'woff', 'woff2',
		'scss',
		'pdf',
	])
	eleventyConfig.addExtension('scss', {
		outputFileExtension: 'css',
		compile(inputContent, inputPath) {
			const { css, loadedUrls } = sass.compileString(inputContent, {
				loadPaths: [
					path.parse(inputPath).dir || '.',
					this.config.dir.includes,
				],
				silenceDeprecations: ['mixed-decls'],
			})
			this.addDependencies(inputPath, loadedUrls)
			return () => css
		},
	})
	const md = markdownIt({
		html: true,
		breaks: true,
		linkify: true,
	}).use(markdownItDeflist)
	eleventyConfig.setLibrary('md', md)
	eleventyConfig.addFilter('markdown', content => md.render(content))
	eleventyConfig.addFilter('markdownInline', content => md.renderInline(content))
	eleventyConfig.addFilter('slugify', content => content.replace(/[\\\/:*?"<>| !@#$%^&`'{}-]+/g, '-').replace(/^-|-$/g, ''))
	eleventyConfig.addPlugin(highlightPlugin)
	eleventyConfig.addPlugin(feedPlugin, {
		type: 'atom',
		outputPath: '/feed.xml',
		collection: {
			name: 'post',
			limit: 8,
		},
		metadata: {
			language: 'zh-Hans',
			title: 'satgo1546’s ocean',
			subtitle: '',
			base: 'https://satgo1546.github.io/',
			author: {
				name: 'Frog Chen',
			},
		},
	})
	return {
		htmlTemplateEngine: 'webc',
		markdownTemplateEngine: false,
	}
}
