const path = require('path')

module.exports = eleventyConfig => {
	eleventyConfig.setServerPassthroughCopyBehavior('passthrough')
	eleventyConfig.addGlobalData('layout', 'layout')
	eleventyConfig.addGlobalData('title', '<i>无标题</i>')
	eleventyConfig.addGlobalData('theme', 'theme-modern-magic light')
	eleventyConfig.addGlobalData('class', '')
	eleventyConfig.addGlobalData('lang', 'zh-Hans')
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-webc'), {
		components: ['_components/**/*.html'],
	})
	eleventyConfig.addTemplateFormats([
		'jpg', 'png', 'webp', 'svg',
		'woff2',
		'scss',
	])
	eleventyConfig.addExtension('scss', {
		outputFileExtension: 'css',
		compile(inputContent, inputPath) {
			const { css, loadedUrls } = require('sass').compileString(inputContent, {
				loadPaths: [
					path.parse(inputPath).dir || '.',
					this.config.dir.includes,
				],
			})
			this.addDependencies(inputPath, loadedUrls)
			return () => css
		},
	})
	const md = require('markdown-it')({
		html: true,
		breaks: true,
		linkify: true,
	}).use(require('markdown-it-deflist'))
	eleventyConfig.setLibrary('md', md)
	eleventyConfig.addFilter('markdown', content => md.render(content))
	eleventyConfig.addFilter('markdownInline', content => md.renderInline(content))
	eleventyConfig.addFilter('slugify', content => content.replace(/[\\\/:*?"<>| !@#$%^&`'{}-]+/g, '-').replace(/^-|-$/g, ''))
	eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'), {
		type: 'atom',
		outputPath: '/feed.xml',
		collection: {
			name: 'post',
			limit: 10,
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
