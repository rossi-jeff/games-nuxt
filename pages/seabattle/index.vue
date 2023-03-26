<template>
	<div class="sea-battle-game">
		<!-- ship placement-->
		<SeaBattleShipPlacement
			:axis="state.Axis"
			:ships-to-place="state.shipsToPlace"
			v-if="
				state.status == GameStatus.Playing &&
				state.shipsToPlace &&
				state.shipsToPlace.length > 0
			"
			@place-ship="placeShip"
		/>
		<!-- game options -->
		<SeaBattleGameOptions
			@place-ships="placeShips"
			v-if="state.status != GameStatus.Playing"
		/>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/seabattle/scores">See Top Scores</NuxtLink>
		</div>
		<div>{{ state }}</div>
	</div>
</template>

<script lang="ts" setup>
import { GameStatus } from '../../utils/enum/game-status.enum'
import { SeaBattleShip } from '../../utils/types/sea-batte-ship.type'
import { SeaBattleTurn } from '../../utils/types/sea-battle-turn.type'
import { SeaBattle } from '../../utils/types/sea-battle.type'

let Axis: number = 8
let sea_battle: SeaBattle = {}
let sea_battle_ship: SeaBattleShip = {}
let sea_battle_turn: SeaBattleTurn = {}
let shipsToPlace: string[] = []
let status: GameStatus | undefined
const state = reactive({
	Axis,
	sea_battle,
	sea_battle_ship,
	sea_battle_turn,
	shipsToPlace,
	status,
})

const placeShips = (event: any) => {
	const { Axis, Ships } = event
	state.Axis = Axis
	const toPlace: string[] = []
	for (const key in Ships) {
		if (Ships[key]) {
			for (let i = 0; i < Ships[key]; i++) toPlace.push(key)
		}
	}
	state.shipsToPlace = toPlace
	state.status = GameStatus.Playing
	newGame(Axis)
}

const newGame = async (Axis: number) => {
	console.log({ Axis })
}

const reloadGame = async () => {}

const placeShip = async (event: any) => {
	const { ship } = event
	console.log({ ship })
	const { shipsToPlace } = state
	const idx = shipsToPlace.indexOf(ship.Type)
	if (idx != -1) {
		shipsToPlace.splice(idx, 1)
		state.shipsToPlace = shipsToPlace
	}
}

const placePlayerShip = async () => {}

const placeOpponentShip = async () => {}
</script>
