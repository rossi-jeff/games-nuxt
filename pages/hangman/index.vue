<template>
	<div class="hang-man-game">
		<!-- hang man image -->
		<HangManImage :wrong="state.hang_man.Wrong" />
		<!-- word display-->
		<HangManWordDisplay
			:display="state.Display"
			v-if="state.status == GameStatus.Playing"
		/>
		<!-- letter - buttons -->
		<HangManLetterButtons
			:correct="state.hang_man.Correct"
			:wrong="state.hang_man.Wrong"
			v-if="state.status == GameStatus.Playing"
			@guess-letter="guessLetter"
		/>
		<!-- lost word display-->
		<HangManLost
			v-if="state.status == GameStatus.Lost && state.word"
			:word="state.word"
		/>
		<!-- game options -->
		<HangManGameOptions
			@get-word="randomWord"
			v-if="state.status != GameStatus.Playing"
		/>
		<!-- in progress -->
		<HangManScoresList
			:items="state.inProgress"
			label="Continue"
			v-if="state.session.SignedIn && state.status != GameStatus.Playing"
			@follow-link="continueGame"
		/>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/hangman/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { GameStatus } from '../../utils/enum/game-status.enum'
import { HangMan } from '../../utils/types/hang-man.type'
import { Word } from '../../utils/types/word.type'

let word: Word = {}
let hang_man: HangMan = {}
let status: GameStatus | undefined
let Min = 6
let Max = 12
let Length = 0
let Display: string[] = []
let inProgress: HangMan[] = []

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

const state = reactive({
	word,
	hang_man,
	status,
	Min,
	Max,
	Length,
	Display,
	session,
	inProgress,
})

const randomWord = async (event: any) => {
	const { Min, Max } = event
	state.Min = Min
	state.Max = Max
	state.status = undefined
	try {
		const result = await fetch(`${apiUrl}/api/word/random`, {
			method: 'POST',
			body: JSON.stringify({ Min, Max }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.word = await result.json()
			state.Length = state.word.Length || 0
			state.Display = []
			for (let i = 0; i < state.Length; i++) state.Display[i] = ''
			if (state.word.id) newGame(state.word.id)
		}
	} catch (error) {
		console.log(error)
	}
}

const newGame = async (WordId: number) => {
	try {
		const result = await fetch(`${apiUrl}/api/hang_man`, {
			method: 'POST',
			body: JSON.stringify({ WordId }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.hang_man = await result.json()
			state.status = state.hang_man.Status
		}
	} catch (error) {
		console.log(error)
	}
}

const guessLetter = async (event: any) => {
	const {
		hang_man,
		word: { Word },
	} = state
	if (!hang_man.id || !Word) return
	const { Letter } = event
	try {
		const result = await fetch(`${apiUrl}/api/hang_man/${hang_man.id}/guess`, {
			method: 'POST',
			body: JSON.stringify({ Word, Letter: Letter.toLowerCase() }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			const { Found } = await result.json()
			if (Found) {
				for (let i = 0; i < Word.length; i++) {
					const l = Word[i].toUpperCase()
					if (l == Letter) state.Display[i] = Letter
				}
			}
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const reloadGame = async () => {
	const { hang_man } = state
	if (!hang_man.id) return
	try {
		const result = await fetch(`${apiUrl}/api/hang_man/${hang_man.id}`)
		if (result.ok) {
			state.hang_man = await result.json()
			state.status = state.hang_man.Status
			if (state.hang_man.word) state.word = state.hang_man.word
			if (state.word.Length) state.Length = state.word.Length
			if (state.status != GameStatus.Playing) getInProgress()
			if (state.hang_man.Correct && state.word.Word) {
				state.Display = []
				for (let i = 0; i < state.Length; i++) state.Display[i] = ''
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

const getInProgress = async () => {
	if (!state.session.SignedIn) return
	try {
		const result = await fetch(`${apiUrl}/api/hang_man/progress`, {
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.inProgress = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

const continueGame = (event: any) => {
	const { id } = event
	state.hang_man.id = id
	state.Display = []
	reloadGame()
}

onMounted(() => getInProgress())
</script>

<style lang="postcss">
div.hang-man-game {
	@apply mx-2 my-2;
}
</style>
