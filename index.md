---
---

<script setup lang="ts">
import posts from './posts'
</script>

<div>
	<pre>
		{{ posts }}
	</pre>
	<ul>
		<li v-for="{ title, relativePath } of posts">
			<a :href="relativePath.replace(/\.md$/, '.html').replace(/\/index\.html$/, '/')">{{ title }}</a>
		</li>
	</ul>
</div>
