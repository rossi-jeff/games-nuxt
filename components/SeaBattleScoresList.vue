<template>
	<div class="sea-battle-scores-list">
		<div
			class="sea-battle-score"
			v-for="sea_battle of props.items"
			:key="sea_battle.id"
		>
			<div class="link">{{ sea_battle.id }}</div>
			<div class="status">{{ sea_battle.Status }}</div>
			<div class="status">{{ sea_battle.Score }}</div>
			<div class="status">{{ sea_battle.Axis }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.sea-battle-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
