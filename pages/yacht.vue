<template>
	<div class="yacht">
		<h1>Yacht</h1>
		<div
			v-show="
				state.yacht.id != undefined &&
				state.yacht.NumTurns != undefined &&
				state.yacht.NumTurns < 12
			"
		>
			<h2>Playing</h2>
			<div
				v-if="
					state.turn &&
					state.turn.RollOne != undefined &&
					state.turn.RollOne != ''
				"
			>
				<h3>First Roll</h3>
				<div>{{ state.turn.RollOne }}</div>
			</div>
			<div v-else>
				<button @click="firstRoll">First Roll</button>
			</div>
		</div>
		<div v-show="!state.yacht.id || state.yacht.NumTurns == 12">
			<button @click="newGame">New Game</button>
		</div>
		<div>{{ JSON.stringify(state) }}</div>
	</div>
</template>

<script lang="ts" setup>
import { YachtScoreOption } from '../utils/types/yacht-score-option.type'
import { YachtTurn } from '../utils/types/yacht-turn.type'
import { Yacht } from '../utils/types/yacht.type'
import { FlagType } from '../utils/types/flag-type.type'
let yacht: Yacht = reactive({})
let turn: YachtTurn = reactive({})
let options: YachtScoreOption[] = reactive([])
const flags: FlagType = reactive({
	rollOne: false,
	rollTwo: false,
	rollThree: false,
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

const firstRoll = () => {
	roll([]).then(() => {
		state.flags.rollOne = true
	})
}
</script>
