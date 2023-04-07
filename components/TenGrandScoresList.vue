<template>
	<div class="ten-grand-scores-list">
		<div class="ten-grand-header">
			<div class="link">{{ props.label }}</div>
			<div class="status">Status</div>
			<div class="tg-score">Score</div>
		</div>
		<div
			class="ten-grand-score"
			v-for="ten_grand of props.items"
			:key="ten_grand.id"
		>
			<div class="link">
				<button @click="followLink(ten_grand.id)">{{ props.label }}</button>
			</div>
			<div class="status">{{ ten_grand.Status }}</div>
			<div class="tg-score">{{ ten_grand.Score }}</div>
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
div.ten-grand-header {
	@apply flex flex-wrap justify-between font-bold bg-slate-200 mb-1 px-1;
}
div.ten-grand-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-slate-500;
}
div.link {
	@apply w-20 text-left;
}
div.status {
	@apply w-20 text-center;
}
div.tg-score {
	@apply w-20 text-right;
}
div.ten-grand-score button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}
div.ten-grand-score button:hover {
	@apply bg-slate-600 text-white;
}
</style>
