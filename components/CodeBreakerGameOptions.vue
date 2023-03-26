<template>
	<div class="code-breaker-game-options">
		<div class="cb-options-form">
			<div class="color-radios">
				<button @click="checkAll">Check All</button>
				<div v-for="(color, index) of colors" :key="index" :class="color">
					<strong>{{ color }}</strong
					><br />
					<input
						type="checkbox"
						:value="color"
						v-model="state.selected.Colors"
						:checked="state.selected.Colors.includes(color)"
					/>
				</div>
			</div>
			<select v-model="state.selected.Columns">
				<option
					v-for="column of columns"
					:key="column"
					:value="column"
					:selected="state.selected.Columns == column"
				>
					{{ column }}
				</option>
			</select>
			<div class="w-24 text-right">
				<button
					:disabled="state.selected.Colors.length < 2"
					@click="startGame"
					v-show="state.selected.Colors.length > 1"
				>
					Start Game
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ColorArray } from '../utils/enum/color.enum'

const colors = ColorArray
const columns = [4, 5, 6, 7, 8]
const selected: { Colors: string[]; Columns: number } = {
	Colors: [],
	Columns: 4,
}
const state = reactive({ selected })
const emit = defineEmits(['startGame'])

const checkAll = () => {
	state.selected.Colors = ColorArray
}

const startGame = () => {
	const { selected } = state
	emit('startGame', selected)
}
</script>

<style lang="postcss">
div.code-breaker-game-options {
	@apply border border-black rounded p-2 mx-2 my-1;
}
div.cb-options-form {
	@apply flex flex-wrap justify-between mx-2;
}
div.color-radios {
	@apply flex flex-wrap;
}
div.color-radios div,
div.color-radios button {
	@apply mr-2 mb-2 border rounded w-20 text-center;
}
.Black {
	@apply bg-black border-black text-white;
}
.Blue {
	@apply bg-blue-700 border-blue-900 text-white;
}
.Brown {
	@apply bg-amber-800 border-amber-900 text-white;
}
.Green {
	@apply bg-green-500 border-green-900;
}
.Orange {
	@apply bg-orange-400 border-orange-900;
}
.Purple {
	@apply bg-purple-600 border-purple-900;
}
.Red {
	@apply bg-red-600 border-red-900;
}
.White {
	@apply bg-white border-black;
}
.Yellow {
	@apply bg-yellow-300 border-yellow-900;
}
</style>
