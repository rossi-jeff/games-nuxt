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
	@apply flex flex-wrap justify-between mx-2 font-bold bg-gray-200 mb-1 px-1;
}
div.sea-battle-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
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
</style>
