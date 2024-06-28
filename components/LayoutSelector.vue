<script lang="ts">
// Note that this script block is not <script setup>, so the state is global.
import { ref } from 'vue'
export const selectedLayout = ref('')
</script>

<script setup lang="ts">
defineExpose({ selectedLayout })
</script>

<template>
	<select v-model="selectedLayout">
		<option value="">页面主题</option>
		<option value="TwentyTwelve">2012</option>
	</select>
</template>
