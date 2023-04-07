<template>
	<div class="yacht-score-card">
		<div class="yacht-score" v-for="(turn, index) of props.turns" :key="index">
			<div class="category">{{ turn.Category }}</div>
			<div class="score">{{ turn.Score }}</div>
		</div>
		<div class="yacht-total">
			<div class="total-label">Total:</div>
			<div class="total">{{ props.total }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['turns', 'total'])
</script>

<style lang="postcss">
div.yacht-score-card {
	@apply border border-black rounded p-2 bg-slate-100;
}
div.yacht-score,
div.yacht-total {
	@apply flex flex-wrap px-2 border border-dashed border-b-gray-500;
}
div.category {
	@apply flex-grow;
}
div.total-label {
	@apply flex-grow text-right pr-2 font-bold;
}
</style>
