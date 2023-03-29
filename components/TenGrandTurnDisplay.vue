<template>
	<div class="ten-grand-turn-display">
		<div class="ten-grand-scores-list">
			<div
				class="ten-grand-score"
				v-for="score of props.turn.scores"
				:key="score.id"
			>
				<div class="name">{{ score.Category }}</div>
				<div class="dice">{{ score.Dice }}</div>
				<div class="score">{{ score.Score }}</div>
			</div>
		</div>
		<div class="ten-grand-turn-score">
			{{ props.turn ? props.turn.Score : 0 }}
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['turn'])
</script>

<style lang="postcss">
div.ten-grand-turn-display {
	@apply flex flex-wrap p-2 border border-dashed border-b-black;
}
div.ten-grand-turn-score {
	@apply w-36 text-right;
}
div.ten-grand-scores-list {
	@apply flex-grow;
}
div.ten-grand-score {
	@apply flex flex-wrap px-2 justify-between border border-dotted border-b-gray-500;
}
div.name {
	@apply w-36 text-left;
}
div.dice {
	@apply w-24 text-center;
}
div.score {
	@apply w-24 text-right;
}
</style>
