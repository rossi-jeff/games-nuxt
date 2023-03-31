<template>
	<div class="code-breaker-scores-list">
		<div class="code-breaker-header">
			<div class="link">{{ props.label }}</div>
			<div class="cb-user">User</div>
			<div class="status">Status</div>
			<div class="cb-score">Score</div>
			<div class="columns">Columns</div>
			<div class="colors">Colors</div>
		</div>
		<div
			class="code-breaker-score"
			v-for="code_breaker of props.items"
			:key="code_breaker.id"
		>
			<div class="link">
				<button @click="followLink(code_breaker.id)">{{ props.label }}</button>
			</div>
			<div class="cb-user">
				{{ code_breaker.user ? code_breaker.user.UserName : 'Anonymous' }}
			</div>
			<div class="status">{{ code_breaker.Status }}</div>
			<div class="cb-score">{{ code_breaker.Score }}</div>
			<div class="columns">{{ code_breaker.Columns }}</div>
			<div class="colors">{{ code_breaker.Colors }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items', 'label'])
const emit = defineEmits(['followLink'])

const followLink = (id: number) => {
	emit('followLink', { id })
}
</script>

<style lang="postcss">
div.code-breaker-header {
	@apply flex flex-wrap justify-between mx-2 font-bold bg-gray-200 mb-1 px-1;
}
div.code-breaker-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
div.link {
	@apply w-20 text-left;
}
div.cb-user {
	@apply w-32 text-left;
}
div.status,
div.cb-score,
div.columns {
	@apply w-20 text-center;
}
div.colors {
	@apply w-20 text-right;
}
</style>
