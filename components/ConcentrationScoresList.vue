<template>
	<div class="concentration-scores-list">
		<div
			class="concentration-score"
			v-for="concentration of props.items"
			:key="concentration.id"
		>
			<div class="link">{{ concentration.id }}</div>
			<div class="status">{{ concentration.Status }}</div>
			<div class="time">{{ formatElapsedSeconds(concentration.Elapsed) }}</div>
			<div class="moves">{{ concentration.Moves }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.concentration-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
