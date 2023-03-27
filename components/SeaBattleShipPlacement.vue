<template>
	<div class="sea-battle-ship-placement">
		<!-- grid -->
		<div class="placement-grid">
			<div class="top-header-row">
				<div class="header-cell"></div>
				<div class="header-cell" v-for="H of axisH" :key="`TH-${H}`">
					{{ H }}
				</div>
			</div>
			<div class="placement-row" v-for="V of axisV" :key="`row-${V}`">
				<div class="header-cell">{{ V }}</div>
				<div
					class="placement-cell"
					v-for="H of axisH"
					:key="`cell-${V}-${H}`"
					:id="`P-${V}-${H}`"
				></div>
			</div>
		</div>
		<!-- form -->
		<div class="placement-form">
			<div class="ship-select-div">
				<label for="ship-select">Type</label>
				<select
					name="ship-select"
					v-model="state.ship.Type"
					@change="highLightShip"
				>
					<option
						v-for="(t, index) of props.shipsToPlace"
						:key="index"
						:value="t"
					>
						{{ t }}
					</option>
				</select>
			</div>
			<div class="h-select-div">
				<label for="h-select">H</label>
				<select
					name="h-select"
					v-model="state.start.Horizontal"
					@change="highLightShip"
				>
					<option
						v-for="h of axisH"
						:key="h"
						:value="h"
						:selected="h == state.start.Horizontal"
					>
						{{ h }}
					</option>
				</select>
			</div>
			<div class="v-select-div">
				<label for="v-select">V</label>
				<select
					name="v-select"
					v-model="state.start.Vertical"
					@change="highLightShip"
				>
					<option
						v-for="v of axisV"
						:key="v"
						:value="v"
						:selected="v == state.start.Vertical"
					>
						{{ v }}
					</option>
				</select>
			</div>
			<div class="direction-select-div">
				<label for="d-select">D</label>
				<select
					name="d-select"
					v-model="state.direction"
					@change="highLightShip"
				>
					<option
						v-for="d of ShipDirections"
						:key="d"
						:value="d"
						:selected="d == state.direction"
					>
						{{ d }}
					</option>
				</select>
			</div>
		</div>

		<!-- errors -->
		<div v-if="state.errors.length > 0">
			<div class="error" v-for="(e, i) of state.errors" :key="i">{{ e }}</div>
		</div>
		<div v-else>
			<button :disabled="state.errors.length > 0" @click="placeShip">
				Place Ship
			</button>
		</div>

		<div>{{ props }}</div>
		<div>{{ state }}</div>
	</div>
</template>

<script lang="ts" setup>
import { SeaBattleMaxAxis } from '../utils/sea-battle-max-axis';
import {
	ShipDirections,
	ShipType,
	ShipTypeLength,
} from '../utils/enum/ship-type.enum'
import { PointType } from '~~/utils/types/point-type.type';
const props = defineProps(['axis', 'shipsToPlace'])


type PlaceShipArgs = {
	Type: ShipType
	Size: number
	Points: PointType[]
}
const axisH = SeaBattleMaxAxis.H.slice(0, props.axis)
const axisV = SeaBattleMaxAxis.V.slice(0, props.axis)
const shipTypes = Object.values(ShipType)

let occupied: PointType[] = []
const ship: PlaceShipArgs = {
	Type: shipTypes[0],
	Size: ShipTypeLength[shipTypes[0]],
	Points: [],
}
let errors: string[] = []
let start: PointType = {
	Horizontal: axisH[0],
	Vertical: axisV[0],
}
let direction: string = ShipDirections[0]
let highlighted: PointType[] = []
const state = reactive({
	occupied,
	ship,
	errors,
	start,
	direction,
	highlighted,
})

const emit = defineEmits(['placeShip'])

const highLightShip = () => {
	if (state.highlighted.length) {
		let el
		for (const point of state.highlighted) {
			el = document.getElementById(`P-${point.Vertical}-${point.Horizontal}`)
			if (el) el.classList.remove('highlighted')
		}
	}
	state.highlighted = []
	if (!state.start.Vertical || !state.start.Horizontal || !state.direction)
		return
	let idxV = axisV.indexOf(state.start.Vertical)
	let idxH = axisH.indexOf(state.start.Horizontal)
	let size = ShipTypeLength[state.ship.Type]
	state.ship.Size = size
	state.errors = []
	while (state.highlighted.length < size && state.errors.length == 0) {
		if (idxH < 0 || idxH >= props.axis) {
			state.errors.push('Highlighted ship crosses horizontal boundary')
			break
		}
		if (idxV < 0 || idxV >= props.axis) {
			state.errors.push('Highlighted ship crosses vertical boundary')
			break
		}
		if (
			state.occupied.find(
				(p) => p.Horizontal == axisH[idxH] && p.Vertical == axisV[idxV]
			)
		) {
			state.errors.push('Highlighted ship crosses already placed ship')
			break
		}
		const point: PointType = {
			Horizontal: axisH[idxH],
			Vertical: axisV[idxV],
		}
		state.highlighted.push(point)
		switch (state.direction) {
			case 'right':
				idxH++
				break
			case 'down':
				idxV++
				break
			case 'left':
				idxH--
				break
			case 'up':
				idxV--
		}
	}
	if (state.highlighted.length) {
		let el
		for (const point of state.highlighted) {
			el = document.getElementById(`P-${point.Vertical}-${point.Horizontal}`)
			if (el) el.classList.add('highlighted')
		}
	}
}

const placeShip = () => {
	let el
	state.ship.Points = []
	while (state.highlighted.length) {
		const point = state.highlighted.pop()
		if (point) {
			el = document.getElementById(`P-${point.Vertical}-${point.Horizontal}`)
			if (el) {
				el.classList.remove('highlighted')
				el.classList.add('occupied')
			}
			state.occupied.push(point)
			state.ship.Points.push(point)
		}
	}
	state.start.Horizontal = axisH[0]
	state.start.Vertical = axisV[0]
	const { ship } = state
	emit('placeShip', { ship })
}
</script>

<style lang="postcss">
div.sea-battle-ship-placement {
	@apply border border-black rounded mx-2 my-1 p-2;
}
div.placement-grid {
	@apply mx-2 border border-gray-500 p-0 max-w-fit mb-4;
}
div.placement-row,
div.top-header-row {
	@apply flex flex-wrap;
}
div.header-cell {
	@apply w-8 h-8 p-0 m-0 bg-gray-300 font-bold text-center pt-1;
}
div.placement-cell {
	@apply w-8 h-8 p-0 m-0 border border-dotted border-gray-300;
}
div.placement-form {
	@apply flex flex-wrap;
}
div.placement-form label {
	@apply max-w-fit mr-2 inline-block font-bold;
}
.highlighted {
	@apply bg-yellow-200;
}
.occupied {
	@apply bg-gray-200;
}
</style>
