<template>
	<div class="sea-battle-header">
		<div class="link">{{ props.label }}</div>
		<div class="status">Status</div>
		<div class="sb-score">Score</div>
		<div class="axis">Axis</div>
	</div>
	<div class="sea-battle-scores-list">
		<div
			class="sea-battle-score"
			v-for="sea_battle of props.items"
			:key="sea_battle.id"
		>
			<div class="link">
				<button @click="followLink(sea_battle.id)">{{ props.label }}</button>
			</div>
			<div class="status">{{ sea_battle.Status }}</div>
			<div class="sb-score">{{ sea_battle.Score }}</div>
			<div class="axis">{{ sea_battle.Axis }}</div>
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
div.sea-battle-header {
	@apply flex flex-wrap justify-between font-bold bg-slate-200 mb-1 px-1;
}
div.sea-battle-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-slate-500;
}
div.link {
	@apply w-20 text-left;
}
div.status,
div.sb-score {
	@apply w-20 text-center;
}
div.axis {
	@apply w-20 text-right;
}
div.sea-battle-score button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}
div.sea-battle-score button:hover {
	@apply bg-slate-600 text-white;
}
</style>
