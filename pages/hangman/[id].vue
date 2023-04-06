<template>
	<div class="hang-man-details">
		<!-- back link -->
		<NuxtLink to="/hangman/scores" class="mx-2 mb-2">&lt; Back to Scores</NuxtLink>
		<!-- hang man image -->
		<HangManImage :wrong="state.hang_man.Wrong" />
		<!-- word display-->
		<HangManWordDisplay :display="state.Display" />
		<!-- lost word display-->
		<HangManLost
			v-if="state.hang_man.Status == GameStatus.Lost && state.word"
			:word="state.word"
		/>
	</div>
</template>

<script lang="ts" setup>
import { HangMan } from '../../utils/types/hang-man.type'
import { Word } from '../../utils/types/word.type'
import { GameStatus } from '../../utils/enum/game-status.enum'

const route = useRoute()
let hang_man: HangMan = {}
let word: Word = {}
let Display: string[] = []
const state = reactive({ hang_man, word, Display })

const loadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/hang_man/${route.params.id}`)
		if (result.ok) {
			state.hang_man = await result.json()
			if (state.hang_man.word) state.word = state.hang_man.word
			if (state.hang_man.Correct && state.word.Length && state.word.Word) {
				state.Display = []
				for (let i = 0; i < state.word.Length; i++) state.Display[i] = ''
				let correct: string[] = state.hang_man.Correct.toUpperCase()
					.split(',')
					.filter((l) => l.length == 1)
				let letters: string[] = state.word.Word.toUpperCase()
					.split('')
					.filter((l) => l.length == 1)
				for (let i = 0; i < letters.length; i++) {
					if (correct.includes(letters[i])) state.Display[i] = letters[i]
				}
			}
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => loadGame())
</script>

<style lang="postcss">
div.hang-man-details {
	@apply mx-2 my-2;
}
div.hang-man-details a {
	@apply font-bold text-indigo-600;
}
div.hang-man-details a:hover {
	@apply underline text-indigo-900;
}
</style>
