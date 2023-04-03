<template>
	<div class="guess-word-detail">
		<!-- back link -->
		<NuxtLink to="/guessword/scores" class="mx-2 mb-2">Back to Scores</NuxtLink>
		<!-- guess list -->
		<GuessWordGuessList
			:guesses="state.guess_word.guesses"
			v-if="state.guess_word.guesses && state.guess_word.guesses.length"
		/>
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
