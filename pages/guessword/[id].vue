<template>
	<div class="guess-word-detail">
		<Head>
			<Title>Guess Word Score Detail</Title>
		</Head>
		<!-- back link -->
		<NuxtLink to="/guessword/scores" class="mx-2 mb-2">&lt; Back to Scores</NuxtLink>
		<!-- guess list -->
		<GuessWordGuessList
			:guesses="state.guess_word.guesses"
			v-if="state.guess_word.guesses && state.guess_word.guesses.length"
		/>
		<!-- solution -->
		<GuessWordSolution :word="state.guess_word.word" />
	</div>
</template>

<script lang="ts" setup>
import { GuessWord } from '../../utils/types/guess-word.type'

let guess_word: GuessWord = {}
const route = useRoute()
const state = reactive({ guess_word })

const loadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/guess_word/${route.params.id}`)
		if (result.ok) {
			state.guess_word = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => loadGame())
</script>

<style lang="postcss">
div.guess-word-detail {
	@apply mx-2 my-2;
}
div.guess-word-detail a {
	@apply font-bold text-indigo-600;
}
div.guess-word-detail a:hover {
	@apply underline text-indigo-900;
}
</style>
