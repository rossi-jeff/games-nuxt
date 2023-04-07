<template>
	<div class="code-breaker-game">
		<Head>
			<Title>Code Breaker</Title>
		</Head>
		<!-- code breaker guess list-->
		<CodeBreakerGuessList
			:guesses="state.code_breaker.guesses"
			v-if="state.code_breaker.guesses && state.code_breaker.guesses.length > 0"
		/>
		<!-- guess form -->
		<CodeBreakerGuessForm
			v-if="state.status && state.status == GameStatus.Playing"
			:available="state.available"
			:columns="state.columns"
			@send-guess="sendGuess"
		/>
		<!-- new game options -->
		<CodeBreakerGameOptions
			v-if="!state.status || state.status != GameStatus.Playing"
			@start-game="newGame"
		/>
		<!-- in progress -->
		<CodeBreakeerScoresList
			:items="state.inProgress"
			label="Continue"
			v-if="state.session.SignedIn && state.status != GameStatus.Playing"
			@follow-link="continueGame"
		/>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/codebreaker/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { GameStatus } from '../../utils/enum/game-status.enum'
import { CodeBreakerGuess } from '../../utils/types/code-breaker-guess.type'
import { CodeBreaker } from '../../utils/types/code-breaker.type'

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

let code_breaker: CodeBreaker = {}
let code_breaker_guess: CodeBreakerGuess = {}
let status: GameStatus | undefined
let available: string[] = []
let columns = 4
let inProgress: CodeBreaker[] = []
const state = reactive({
	code_breaker,
	code_breaker_guess,
	status,
	available,
	columns,
	session,
	inProgress,
})

const newGame = async (event: any) => {
	const { Colors, Columns } = event
	state.available = Colors
	state.columns = Columns
	try {
		const result = await fetch(`${apiUrl}/api/code_breaker`, {
			method: 'POST',
			body: JSON.stringify({ Colors, Columns }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.code_breaker = await result.json()
			state.status = state.code_breaker.Status
		}
	} catch (error) {
		console.log(error)
	}
}

const sendGuess = async (event: any) => {
	const { selected: Colors } = event
	const { code_breaker } = state
	if (!code_breaker.id) return
	try {
		const result = await fetch(
			`${apiUrl}/api/code_breaker/${code_breaker.id}/guess`,
			{
				method: 'POST',
				body: JSON.stringify({ Colors }),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.code_breaker_guess = await result.json()
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const reloadGame = async () => {
	const { code_breaker } = state
	if (!code_breaker.id) return
	try {
		const result = await fetch(`${apiUrl}/api/code_breaker/${code_breaker.id}`)
		if (result.ok) {
			state.code_breaker = await result.json()
			state.status = state.code_breaker.Status
			if (state.status != GameStatus.Playing) getInProgress()
			if (state.available.length == 0 && state.code_breaker.Available)
				state.available = state.code_breaker.Available.split(',')
			if (state.code_breaker.Columns) state.columns = state.code_breaker.Columns
		}
	} catch (error) {
		console.log(error)
	}
}

const getInProgress = async () => {
	if (!state.session.SignedIn) return
	try {
		const result = await fetch(`${apiUrl}/api/code_breaker/progress`, {
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
	state.code_breaker.id = id
	reloadGame()
}

onMounted(() => getInProgress())
</script>

<style lang="postcss">
div.code-breaker-game {
	@apply mx-2 my-2;
}
.Black {
	@apply bg-black border-black text-white;
}
.Blue {
	@apply bg-blue-700 border-blue-900 text-white;
}
.Brown {
	@apply bg-amber-800 border-amber-900 text-white;
}
.Green {
	@apply bg-green-500 border-green-900;
}
.Orange {
	@apply bg-orange-400 border-orange-900;
}
.Purple {
	@apply bg-purple-600 border-purple-900;
}
.Red {
	@apply bg-red-600 border-red-900;
}
.White {
	@apply bg-white border-black;
}
.Yellow {
	@apply bg-yellow-300 border-yellow-900;
}
div.scores-link a {
	@apply font-bold text-indigo-600;
}
div.scores-link a:hover {
	@apply underline text-indigo-900;
}
</style>
