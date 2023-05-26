<template>
	<div class="ten-grand-game">

		<Head>
			<Title>Ten Grand</Title>
		</Head>
		<div class="flex flex-wrap justify-between">
			<h1>Ten Grand</h1>
			<div class="scores-link">
				<NuxtLink to="/tengrand/scores">See Top Scores</NuxtLink>
			</div>
		</div>
		<!-- turn form -->
		<TenGrandTurnForm :ten-grand="state.ten_grand" :ten-grand-turn="state.ten_grand_turn"
			v-if="state.status == GameStatus.Playing" @score-options="scoreOptions" />
		<!-- new game button-->
		<div v-if="state.status != GameStatus.Playing">
			<button @click="newGame">New Game</button>
		</div>
		<!-- turn list -->
		<TenGrandTurnList :turns="state.ten_grand.turns" v-if="state.ten_grand && state.ten_grand.turns && state.ten_grand.turns.length
			" />
		<!-- in progress -->
		<TenGrandScoresList :items="state.inProgress" v-if="state.session.SignedIn && state.status != GameStatus.Playing"
			label="Continue" @follow-link="continueGame" />
		<!-- directions -->
		<TenGrandDirections v-if="state.status != GameStatus.Playing" />
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { GameStatus } from '../../utils/enum/game-status.enum'
import { TenGrandTurn } from '../../utils/types/ten-grand-turn.type'
import { TenGrand } from '../../utils/types/ten-grand.type'

let status: GameStatus | undefined
let ten_grand: TenGrand = {}
let ten_grand_turn: TenGrandTurn = {}
let inProgress: TenGrand[] = []

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

const state = reactive({
	status,
	ten_grand,
	ten_grand_turn,
	session,
	inProgress,
})

const newGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand`, {
			method: 'POST',
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.ten_grand = await result.json()
			state.status = state.ten_grand.Status
		}
	} catch (error) {
		console.log(error)
	}
}

const reloadGame = async () => {
	const { ten_grand } = state
	if (!ten_grand.id) return
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand/${ten_grand.id}`)
		if (result.ok) {
			state.ten_grand = await result.json()
			state.status = state.ten_grand.Status
		}
	} catch (error) {
		console.log(error)
	}
}

const scoreOptions = async (event: any) => {
	const { ten_grand } = state
	if (!ten_grand.id) return
	const { TurnId, Dice, Options } = event
	try {
		const result = await fetch(
			`${apiUrl}/api/ten_grand/${ten_grand.id}/score`,
			{
				method: 'POST',
				body: JSON.stringify({ TurnId, Dice, Options }),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.ten_grand_turn = await result.json()
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const getInProgress = async () => {
	if (!state.session.SignedIn) return
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand/progress`, {
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
	state.ten_grand.id = id
	reloadGame()
}

onMounted(() => getInProgress())
</script>

<style lang="postcss">
div.ten-grand-game {
	@apply mx-2 my-2;
}

div.ten-grand-game button {
	@apply border border-black rounded px-2 py-1 bg-slate-200;
}

div.ten-grand-game button:hover {
	@apply bg-slate-600 text-white;
}
</style>
