<template>
	<div class="guess-word-scores-list">
		<div
			class="guess-word-score"
			v-for="guess_word of props.items"
			:key="guess_word.id"
		>
			<div class="link">{{ guess_word.id }}</div>
			<div class="status">{{ guess_word.Status }}</div>
			<div class="score">{{ guess_word.Score }}</div>
			<div class="word">{{ guess_word.word ? guess_word.word.Word : '' }}</div>
			<div class="length">
				{{ guess_word.word ? guess_word.word.Length : 0 }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.guess-word-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
