<template>
	<div class="sea-battle-game">
		<!-- player turn -->
		<SeaBattlePlayerTurn 
			:turns="state.playerTurns"
			:ships="state.opponentShips"
			:axis="state.Axis"
			v-if="
				state.status == GameStatus.Playing && 
				state.shipsToPlace.length == 0 && 
				state.mode == Navy.Player
			" 
			@toggle="toggleMode"
		/>
		<!-- opponent turn -->
		<SeaBattleOpponentTurn 
			:turns="state.opponentTurns"
			:ships="state.playerShips"
			:axis="state.Axis"
			v-if="
				state.status == GameStatus.Playing && 
				state.shipsToPlace.length == 0 && 
				state.mode == Navy.Opponent
			" 
			@toggle="toggleMode"
		/>
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
	</div>
</template>

<script lang="ts" setup>
import { Navy } from '~~/utils/enum/navy.enum'
import { ShipType } from '~~/utils/enum/ship-type.enum'
import { PointType } from '~~/utils/types/point-type.type'
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
const modes = Object.values(Navy)
let playerShips: SeaBattleShip[] = []
let playerTurns: SeaBattleTurn[] = []
let opponentShips: SeaBattleShip[] = []
let opponentTurns: SeaBattleTurn[] = []
const state = reactive({
	Axis,
	sea_battle,
	sea_battle_ship,
	sea_battle_turn,
	shipsToPlace,
	status,
	mode: modes[1],
	playerShips,
	playerTurns,
	opponentShips,
	opponentTurns
})

const toggleMode = () => {
	const { mode } = state
	state.mode = mode == modes[0] ? modes[1] : modes[0]
}

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
	newGame(Axis)
}

const newGame = async (Axis: number) => {
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle`, {
			method: 'POST',
			body: JSON.stringify({ Axis }),
			headers: buildRequestHeaders(blankSession)
		})
		if (result.ok) {
			state.sea_battle = await result.json()
			state.status = GameStatus.Playing
		}
	} catch (error) {
		console.log(error);
	}
}

const reloadGame = async () => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/${sea_battle.id}`)
		if (result.ok) {
			state.sea_battle = await result.json()
			if (state.sea_battle.ships) {
				state.playerShips = state.sea_battle.ships.filter(s => s.Navy == Navy.Player)
				state.opponentShips = state.sea_battle.ships.filter(s => s.Navy == Navy.Opponent)
			}
			if (state.sea_battle.turns) {
				state.playerTurns = state.sea_battle.turns.filter(t => t.Navy == Navy.Player)
				state.opponentTurns = state.sea_battle.turns.filter(t => t.Navy == Navy.Opponent)
			}
		}
	} catch (error) {
		console.log(error)
	}
}

const placeShip = async (event: any) => {
	const { ship: { Type, Size, Points } } = event
	const { shipsToPlace } = state
	const idx = shipsToPlace.indexOf(Type)
	if (idx != -1) {
		shipsToPlace.splice(idx, 1)
		state.shipsToPlace = shipsToPlace
	}
	placePlayerShip(Type, Size, Points)
	placeOpponentShip(Type, Size)
}

const placePlayerShip = async (type: ShipType, size: number, points: PointType[]) => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/${sea_battle.id}/ship`, {
			method: 'POST',
			body: JSON.stringify({ ShipType: type, Size: size, Navy: Navy.Player }),
			headers: buildRequestHeaders(blankSession)
		})
		if (result.ok) {
			state.sea_battle_ship = await result.json()
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const placeOpponentShip = async (type: ShipType, size: number) => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/${sea_battle.id}/ship`, {
			method: 'POST',
			body: JSON.stringify({ ShipType: type, Size: size, Navy: Navy.Opponent }),
			headers: buildRequestHeaders(blankSession)
		})
		if (result.ok) {
			state.sea_battle_ship = await result.json()
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}
</script>
