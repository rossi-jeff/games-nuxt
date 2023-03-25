<template>
	<div class="code-breaker-scores-list">
		<div
			class="code-breaker-score"
			v-for="code_breaker of props.items"
			:key="code_breaker.id"
		>
			<div class="link">{{ code_breaker.id }}</div>
			<div class="status">{{ code_breaker.Status }}</div>
			<div class="score">{{ code_breaker.Score }}</div>
			<div class="columns">{{ code_breaker.Columns }}</div>
			<div class="colors">{{ code_breaker.Colors }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.code-breaker-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
