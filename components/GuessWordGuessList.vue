<template>
	<div class="guess-word-guess-list">
		<div
			class="guess-word-guess"
			v-for="guess of props.guesses"
			:key="guess.id"
		>
			<div
				v-for="(rating, index) of guess.ratings"
				:key="rating.id"
				:class="rating.Rating"
			>
				{{ guess.Guess[index] }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['guesses'])
</script>

<style lang="postcss">
div.guess-word-guess-list {
	@apply border border-black rounded my-1 p-2 bg-slate-100;
}
div.guess-word-guess {
	@apply flex flex-wrap;
}
div.guess-word-guess div {
	@apply w-8 h-8 border rounded text-center mr-4 mb-2;
}
div.guess-word-guess div.Green {
	@apply bg-green-200 border-green-800;
}
div.guess-word-guess div.Brown {
	@apply bg-amber-200 border-amber-900 text-black;
}
div.guess-word-guess div.Gray {
	@apply bg-gray-200 border-gray-800;
}
</style>
