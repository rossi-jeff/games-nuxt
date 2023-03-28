<template>
	<div class="ten-grand-game">
		<!-- turn form -->
		<TenGrandTurnForm 
			:ten-grand="state.ten_grand" 
			:ten-grand-turn="state.ten_grand_turn" 
			v-if="state.status == GameStatus.Playing" 
			@score-options="scoreOptions"
		/>
		<!-- new game button-->
		<div class="mx-2" v-if="state.status != GameStatus.Playing">
			<button @click="newGame">New Game</button>
		</div>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/tengrand/scores">See Top Scores</NuxtLink>
		</div>
		<div>{{ state }}</div>
	</div>
</template>

<script lang="ts" setup>
import { GameStatus } from '../../utils/enum/game-status.enum'
import { TenGrandTurn } from '../../utils/types/ten-grand-turn.type'
import { TenGrand } from '../../utils/types/ten-grand.type'

let status: GameStatus | undefined
let ten_grand: TenGrand = {}
let ten_grand_turn: TenGrandTurn = {}
const state = reactive({ status, ten_grand, ten_grand_turn })

const newGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand`, {
			method: 'POST',
			headers: buildRequestHeaders(blankSession),
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
	console.log(event)
	try {
		reloadGame()
	} catch (error) {
		console.log(error)
	}
}
</script>
