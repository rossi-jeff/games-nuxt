<template>
	<div class="sea-battle-details">
		<Head>
			<Title>Sea Battle Score Detail</Title>
		</Head>
		<!-- player turn -->
		<SeaBattlePlayerTurn
			:turns="state.playerTurns"
			:ships="state.opponentShips"
			:axis="state.Axis"
			:fired="true"
			v-if="state.sea_battle.id"
		/>
		<!-- opponent turn -->
		<SeaBattleOpponentTurn
			:turns="state.opponentTurns"
			:ships="state.playerShips"
			:axis="state.Axis"
			:fired="true"
			v-if="state.sea_battle.id"
		/>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { Navy } from '../../utils/enum/navy.enum'
import { SeaBattleShip } from '../../utils/types/sea-batte-ship.type'
import { SeaBattleTurn } from '../../utils/types/sea-battle-turn.type'
import { SeaBattle } from '../../utils/types/sea-battle.type'
const route = useRoute()
let sea_battle: SeaBattle = {}
let Axis: number = 8
let playerShips: SeaBattleShip[] = []
let playerTurns: SeaBattleTurn[] = []
let opponentShips: SeaBattleShip[] = []
let opponentTurns: SeaBattleTurn[] = []
const state = reactive({
	sea_battle,
	Axis,
	playerShips,
	playerTurns,
	opponentShips,
	opponentTurns,
})

const loadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/${route.params.id}`)
		if (result.ok) {
			state.sea_battle = await result.json()
			if (state.sea_battle.Axis) state.Axis = state.sea_battle.Axis
			if (state.sea_battle.ships) {
				state.playerShips = state.sea_battle.ships.filter(
					(s) => s.Navy == Navy.Player
				)
				state.opponentShips = state.sea_battle.ships.filter(
					(s) => s.Navy == Navy.Opponent
				)
			}
			if (state.sea_battle.turns) {
				state.playerTurns = state.sea_battle.turns.filter(
					(t) => t.Navy == Navy.Player
				)
				state.opponentTurns = state.sea_battle.turns.filter(
					(t) => t.Navy == Navy.Opponent
				)
			}
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => loadGame())
</script>
