export default (data: Lume.Data) => {
	return <html lang="zh-Hans" class={data.theme}>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		{
			data.url === '/'
				? <title>satgo1546’s ocean</title>
				: <>
					<title>{data.htmlToPlainText(data.title!)} · satgo1546’s ocean</title>
					{!!data.tags.length && <meta name="keywords" content={data.tags.join()} />}
					{data.description && <meta name="description" content={data.htmlToPlainText(data.description)} />}
				</>
		}
		<meta name="generator" content={data.generator} />
		<link rel="shortcut icon" type="image/svg" href="/style/favicon.svg" />
		<link rel="stylesheet" href="/style/index.css" />
		<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
		<body>
			{data.children}
		</body>
	</html>
}
