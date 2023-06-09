<template>
	<div class="sea-battle-game">

		<Head>
			<Title>Sea Battle</Title>
		</Head>
		<div class="flex flex-wrap justify-between pl-2">
			<h1>Sea Battle</h1>
			<div class="scores-link">
				<NuxtLink to="/seabattle/scores">See Top Scores</NuxtLink>
			</div>
		</div>
		<!-- player turn -->
		<SeaBattlePlayerTurn :turns="state.playerTurns" :ships="state.opponentShips" :axis="state.Axis"
			:fired="state.fired.player" :status="state.status" v-if="state.status == GameStatus.Playing &&
				state.shipsToPlace.length == 0 &&
				state.mode == Navy.Player &&
				state.visible.player
				" @toggle="toggleMode" @fire="playerFire" />
		<!-- opponent turn -->
		<SeaBattleOpponentTurn :turns="state.opponentTurns" :ships="state.playerShips" :axis="state.Axis"
			:fired="state.fired.opponent" :status="state.status" v-if="state.status == GameStatus.Playing &&
				state.shipsToPlace.length == 0 &&
				state.mode == Navy.Opponent &&
				state.visible.opponent
				" @toggle="toggleMode" @fire="opponentFire" />
		<!-- ship placement-->
		<SeaBattleShipPlacement :axis="state.Axis" :ships-to-place="state.shipsToPlace" v-if="state.status == GameStatus.Playing &&
			state.shipsToPlace &&
			state.shipsToPlace.length > 0
			" @place-ship="placeShip" />
		<!-- game options -->
		<SeaBattleGameOptions @place-ships="placeShips" v-if="state.status != GameStatus.Playing" />
		<!-- in progress -->
		<SeaBattleScoresList :items="state.inProgress" label="Continue"
			v-if="state.session.SignedIn && state.status != GameStatus.Playing" @follow-link="continueGame" />
		<!-- directions -->
		<SeaBattleDirections v-if="state.status != GameStatus.Playing" />
	</div>
</template>

<script lang="ts" setup>
import { stat } from 'fs'
import { storeToRefs } from 'pinia'
import { Navy } from '~~/utils/enum/navy.enum'
import { ShipType, ShipTypeValue } from '~~/utils/enum/ship-type.enum'
import { PointType } from '~~/utils/types/point-type.type'
import { GameStatus } from '../../utils/enum/game-status.enum'
import { FlagType } from '../../utils/types/flag-type.type'
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
let fired: FlagType = {
	player: false,
	opponent: false,
}
let visible: FlagType = {
	player: true,
	opponent: true,
}
let inProgress: SeaBattle[] = []

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

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
	opponentTurns,
	fired,
	visible,
	session,
	inProgress,
})

const toggleMode = () => {
	const { mode } = state
	state.mode = mode == modes[0] ? modes[1] : modes[0]
}

const toggleVisble = () => {
	state.visible.player = false
	state.visible.opponent = false
	setTimeout(() => {
		state.visible.player = true
		state.visible.opponent = true
	}, 25)
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
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.sea_battle = await result.json()
			state.status = GameStatus.Playing
		}
	} catch (error) {
		console.log(error)
	}
}

const reloadGame = async () => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	const initial = sea_battle.turns ? sea_battle.turns.length : 0
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/${sea_battle.id}`)
		if (result.ok) {
			state.sea_battle = await result.json()
			if (state.status != state.sea_battle.Status)
				state.status = state.sea_battle.Status
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
			if (state.sea_battle.turns && state.sea_battle.turns.length != initial) {
				toggleVisble()
			}
		}
	} catch (error) {
		console.log(error)
	}
}

const placeShip = async (event: any) => {
	const {
		ship: { Type, Size, Points },
	} = event
	const { shipsToPlace } = state
	const idx = shipsToPlace.indexOf(Type)
	if (idx != -1) {
		shipsToPlace.splice(idx, 1)
		state.shipsToPlace = shipsToPlace
	}
	placePlayerShip(Type, Size, Points)
	placeOpponentShip(Type, Size)
}

const placePlayerShip = async (
	type: ShipType,
	size: number,
	points: PointType[]
) => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	console.log({ type, size, points })
	try {
		const result = await fetch(
			`${apiUrl}/api/sea_battle/${sea_battle.id}/ship`,
			{
				method: 'POST',
				body: JSON.stringify({
					ShipType: ShipTypeValue[type],
					Size: size,
					Navy: Navy.Player,
					Points: points,
				}),
				headers: buildRequestHeaders(state.session),
			}
		)
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
		const result = await fetch(
			`${apiUrl}/api/sea_battle/${sea_battle.id}/ship`,
			{
				method: 'POST',
				body: JSON.stringify({
					ShipType: ShipTypeValue[type],
					Size: size,
					Navy: Navy.Opponent,
				}),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.sea_battle_ship = await result.json()
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const playerFire = async (event: any) => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	const { Horizontal, Vertical } = event
	try {
		const result = await fetch(
			`${apiUrl}/api/sea_battle/${sea_battle.id}/fire`,
			{
				method: 'POST',
				body: JSON.stringify({ Horizontal, Vertical, Navy: Navy.Player }),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.sea_battle_turn = await result.json()
			state.fired.player = true
			state.fired.opponent = false
			state.playerTurns.push(state.sea_battle_turn)
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const opponentFire = async () => {
	const { sea_battle } = state
	if (!sea_battle.id) return
	try {
		const result = await fetch(
			`${apiUrl}/api/sea_battle/${sea_battle.id}/fire`,
			{
				method: 'POST',
				body: JSON.stringify({ Navy: Navy.Opponent }),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.sea_battle_turn = await result.json()
			state.fired.player = false
			state.fired.opponent = true
			state.opponentTurns.push(state.sea_battle_turn)
			reloadGame()
		}
	} catch (error) {
		console.log(error)
	}
}

const getInProgress = async () => {
	if (!state.session.SignedIn) return
	try {
		const result = await fetch(`${apiUrl}/api/sea_battle/progress`, {
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
	state.sea_battle.id = id
	reloadGame()
}

onMounted(() => getInProgress())
</script>

<style lang="postcss">
div.sea-battle-game {
	@apply mx-2 my-2;
}

div.sea-battle-game button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}

div.sea-battle-game button:hover {
	@apply bg-slate-600 text-white;
}
</style>
