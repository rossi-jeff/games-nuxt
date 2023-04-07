<template>
	<div class="hang-man-scores-list">
		<div class="hang-man-header">
			<div class="link">{{ props.label }}</div>
			<div class="status">Status</div>
			<div class="hm-score">Score</div>
			<div class="word">Word</div>
			<div class="length">Length</div>
		</div>
		<div
			class="hang-man-score"
			v-for="hang_man of props.items"
			:key="hang_man.id"
		>
			<div class="link">
				<button @click="followLink(hang_man.id)">{{ props.label }}</button>
			</div>
			<div class="status">{{ hang_man.Status }}</div>
			<div class="hm-score">{{ hang_man.Score }}</div>
			<div class="word">{{ hang_man.word ? hang_man.word.Word : '' }}</div>
			<div class="length">
				{{ hang_man.word ? hang_man.word.Length : 0 }}
			</div>
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
div.hang-man-header {
	@apply flex flex-wrap justify-between font-bold bg-slate-200 mb-1 px-1;
}
div.hang-man-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-slate-500;
}
div.link {
	@apply w-20 text-left;
}
div.status,
div.hm-score,
div.word {
	@apply w-20 text-center;
}
div.length {
	@apply w-20 text-right;
}
div.hang-man-score button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}
div.hang-man-score button:hover {
	@apply bg-slate-600 text-white;
}
</style>
