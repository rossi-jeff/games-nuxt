<template>
	<div class="sea-battle-opponent-turn">
		<h2>Opponent Turn</h2>
		<!-- ship grid -->
		<div class="ship-grid">
			<div class="top-header-row">
				<div class="header-cell"></div>
				<div class="header-cell" v-for="H of axisH" :key="`TH-${H}`">
					{{ H }}
				</div>
			</div>
			<div class="ship-row" v-for="V of axisV" :key="`row-${V}`">
				<div class="header-cell">{{ V }}</div>
				<div
					class="ship-cell"
					v-for="H of axisH"
					:key="`cell-${V}-${H}`"
					:id="`S-${V}-${H}`"
				>
					<span></span>
				</div>
			</div>
		</div>
		<div v-if="props.fired == false">
			<button @click="fire">Opponent Fire</button>
		</div>
		<div v-else>
			<button @click="playerTurn">Player Turn</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PointType } from '../utils/types/point-type.type'
import { SeaBattleShip } from '../utils/types/sea-batte-ship.type'
import { SeaBattleTurn } from '../utils/types/sea-battle-turn.type'

const props = defineProps(['ships', 'turns', 'axis', 'fired'])
const emit = defineEmits(['toggle', 'fire'])
const axisH = SeaBattleMaxAxis.H.slice(0, props.axis)
const axisV = SeaBattleMaxAxis.V.slice(0, props.axis)
let occupied: PointType[] = []
const state = reactive({ occupied })

const displayShips = async (ships: SeaBattleShip[]) => {
	let el, id
	for (const ship of ships) {
		if (ship.points) {
			for (const point of ship.points) {
				id = `S-${point.Vertical}-${point.Horizontal}`
				el = document.getElementById(id)
				if (el) el.classList.add('Ship')
			}
		}
	}
}

const displayTurns = (turns: SeaBattleTurn[]) => {
	const occupied: PointType[] = []
	let el
	for (const turn of turns) {
		const { Horizontal, Vertical, Target } = turn
		el = document.getElementById(`S-${Vertical}-${Horizontal}`)
		if (el && Target) el.classList.add(Target)
		occupied.push({ Horizontal, Vertical })
	}
	return occupied
}

setTimeout(() => {
	displayShips(props.ships)
	state.occupied = displayTurns(props.turns)
}, 100)

const playerTurn = () => emit('toggle')

const fire = () => emit('fire')
</script>

<style lang="postcss">
div.sea-battle-opponent-turn {
	@apply border border-black rounded mx-2 my-1 p-2;
}
div.ship-grid {
	@apply mx-2 border border-gray-500 p-0 max-w-fit mb-4;
}
div.ship-row,
div.top-header-row {
	@apply flex flex-wrap;
}
div.header-cell {
	@apply w-8 h-8 p-0 m-0 bg-gray-300 font-bold text-center pt-1;
}
div.ship-cell {
	@apply w-8 h-8 p-0 m-0 border border-dotted border-gray-300 text-center;
}
.Ship {
	@apply bg-gray-200;
}
</style>
