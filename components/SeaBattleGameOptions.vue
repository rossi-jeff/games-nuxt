<template>
	<div class="sea-battle-game-options">
		<div class="axis-select-div">
			<label for="axis-select">Axis</label>
			<select name="axis-select" v-model="state.Axis" @change="checkReady">
				<option
					v-for="axis of axes"
					:key="axis"
					:value="axis"
					:selected="axis == state.Axis"
				>
					{{ axis }}
				</option>
			</select>
		</div>
		<div class="ship-type-div" v-for="shipType of shipTypes" :key="shipType">
			<label for="`ship-type-${shipType}`">{{ shipType }}</label>
			<select
				name="`ship-type-${shipType}`"
				v-model="state.ships[shipType]"
				@change="checkReady"
			>
				<option
					v-for="qty of perType"
					:key="qty"
					:value="qty"
					:selected="qty == state.ships[shipType]"
				>
					{{ qty }}
				</option>
			</select>
		</div>
		<div class="ship-placement-button-div">
			<button :disabled="!state.ready" v-show="state.ready" @click="placeShips">
				Place Ships
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ShipType } from '../utils/enum/ship-type.enum'

let Axis: number = 8
const shipTypes = Object.values(ShipType)
type shipQuantity = { [key: string]: number }

const buildShipQuantities = () => {
	const quantities: shipQuantity = {}
	shipTypes.map((t) => (quantities[t] = 1))
	return quantities
}

let ships: shipQuantity = buildShipQuantities()
const perType: number[] = [0, 1, 2, 3]
const axes: number[] = [6, 8, 10, 12]
const state = reactive({ Axis, ships, ready: true })

const emit = defineEmits(['placeShips'])

const checkReady = () => {
	let shipCount = 0
	for (const key in state.ships) {
		shipCount += state.ships[key]
	}
	state.ready = shipCount > 0
}

const placeShips = () => {
	const { Axis, ships: Ships } = state
	emit('placeShips', { Axis, Ships })
}
</script>

<style lang="postcss">
div.sea-battle-game-options {
	@apply border border-black rounded my-1 p-2 bg-slate-100;
}
div.sea-battle-game-options label {
	@apply mr-2 font-bold w-24 inline-block;
}
div.axis-select-div,
div.ship-type-div {
	@apply mb-2;
}
div.sea-battle-game-options select,
div.sea-battle-game-options button {
	@apply border border-black rounded px-2 py-1 bg-slate-200;
}
div.sea-battle-game-options button:hover {
	@apply bg-slate-600 text-white;
}
</style>
