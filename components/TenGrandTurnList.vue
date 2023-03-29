<template>
	<div class="ten-grand-turn-list">
		<TenGrandTurnDisplay
			v-for="turn of props.turns"
			:key="turn.id"
			:turn="turn"
		/>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['turns'])
</script>

<style lang="postcss">
div.ten-grand-turn-list {
	@apply mx-2 mb-2 border border-black rounded p-2 max-h-96 overflow-y-auto;
}
</style>
