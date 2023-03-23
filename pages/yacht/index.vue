<template>
	<div class="yacht-game">
		<h1>Yacht</h1>
		<div
			v-show="
				state.yacht.id != undefined &&
				state.yacht.NumTurns != undefined &&
				state.yacht.NumTurns < 12
			"
		>
			<!-- first roll -->
			<div
				v-if="
					state.turn &&
					state.turn.RollOne != undefined &&
					state.turn.RollOne != '' &&
					state.flags.showOne
				"
			>
				<YachtRoll
					:dieRoll="state.turn.RollOne"
					title="First Roll"
					label="Second Roll"
					:flag="state.flags.rollTwo"
					@roll="secondRoll"
				/>
			</div>
			<div v-else>
				<button @click="firstRoll">First Roll</button>
			</div>
			<!-- scond roll-->
			<div
				v-if="
					state.turn &&
					state.turn.RollTwo != undefined &&
					state.turn.RollTwo != '' &&
					state.flags.showTwo
				"
			>
				<YachtRoll
					:dieRoll="state.turn.RollTwo"
					title="Second Roll"
					label="Third Roll"
					:flag="state.flags.rollThree"
					@roll="thirdRoll"
				/>
			</div>
			<!-- third roll -->
			<div
				v-if="
					state.turn &&
					state.turn.RollThree != undefined &&
					state.turn.RollThree != '' &&
					state.flags.showThree
				"
			>
				<YachtRoll
					:dieRoll="state.turn.RollThree"
					title="Third Roll"
					label=""
					:flag="true"
					@roll="() => null"
				/>
			</div>
		</div>
		<!-- scoring options-->
		<div v-if="state.options && state.options.length > 0">
			<YachtScoreOptions :options="state.options" @score="scoreTurn" />
		</div>
		<!-- score card -->
		<div
			v-if="state.yacht && state.yacht.turns && state.yacht.turns.length > 0"
		>
			<YachtScoreCard :turns="state.yacht.turns" :total="state.yacht.Total" />
		</div>
		<!-- new game -->
		<div v-show="!state.yacht.id || state.yacht.NumTurns == 12">
			<button @click="newGame">New Game</button>
		</div>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/yacht/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FlagType } from '../../utils/types/flag-type.type'
import { YachtScoreOption } from '../../utils/types/yacht-score-option.type'
import { YachtTurn } from '../../utils/types/yacht-turn.type'
import { Yacht } from '../../utils/types/yacht.type'
let yacht: Yacht = reactive({})
let turn: YachtTurn = reactive({})
let options: YachtScoreOption[] = reactive([])
const flags: FlagType = reactive({
	rollOne: false,
	rollTwo: false,
	rollThree: false,
	showOne: false,
	showTwo: false,
	showThree: false,
})
const state = reactive({ yacht, turn, options, flags })

const newGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/yacht`, {
			method: 'POST',
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			state.yacht = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

const roll = async (Keep: number[] = []) => {
	const { yacht } = state
	if (!yacht.id) return
	try {
		const result = await fetch(`${apiUrl}/api/yacht/${yacht.id}/roll`, {
			method: 'POST',
			body: JSON.stringify({ Keep }),
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			const { Turn, Options } = await result.json()
			state.turn = Turn
			state.options = Options
		}
	} catch (error) {
		console.log(error)
	}
}

const firstRoll = async () => {
	await roll([])
	setTimeout(() => {
		state.flags.rollOne = true
		state.flags.showOne = true
	}, 0)
}

const secondRoll = async (ev: any) => {
	const Keep: number[] = Object.values(ev.Keep)
	state.flags.showOne = false
	await roll(Keep)
	setTimeout(() => {
		state.flags.rollTwo = true
		state.flags.showOne = true
		state.flags.showTwo = true
	}, 0)
}

const thirdRoll = async (ev: any) => {
	const Keep: number[] = Object.values(ev.Keep)
	state.flags.showTwo = false
	await roll(Keep)
	setTimeout(() => {
		state.flags.rollThree = true
		state.flags.showTwo = true
		state.flags.showThree = true
	}, 0)
}

const scoreTurn = async (ev: any) => {
	const { yacht, turn } = state
	if (!yacht.id || !turn.id) return
	const TurnId = turn.id
	const { Category } = ev
	try {
		const result = await fetch(`${apiUrl}/api/yacht/${yacht.id}/score`, {
			method: 'POST',
			body: JSON.stringify({ TurnId, Category }),
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			await result.json()
			state.turn = {}
			state.options = []
			for (const key in state.flags) state.flags[key] = false
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const reloadGame = async () => {
	const { yacht } = state
	if (!yacht.id) return
	try {
		const result = await fetch(`${apiUrl}/api/yacht/${yacht.id}`, {
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			state.yacht = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}
</script>

<style lang="postcss">
h1 {
	@apply font-bold text-xl mb-2;
}
div.yacht {
	@apply p-2;
}
div.yacht-roll,
div.yacht-score-options {
	@apply mb-2;
}
button {
	@apply border border-black rounded my-1 px-2 py-1;
}
button:hover {
	@apply bg-yellow-200;
}
</style>
