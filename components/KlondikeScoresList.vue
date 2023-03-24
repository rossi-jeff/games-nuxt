<template>
	<div class="klondike-scores-list">
		<div
			class="klondike-score"
			v-for="klondike of props.items"
			:key="klondike.id"
		>
			<div class="link">{{ klondike.id }}</div>
			<div class="status">{{ klondike.Status }}</div>
			<div class="time">{{ formatElapsedSeconds(klondike.Elapsed) }}</div>
			<div class="moves">{{ klondike.Moves }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.klondike-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
