<template>
	<div class="code-breaker-game-options">
		<div class="cb-options-form">
			<div class="color-radios">
				<button @click="checkAll">Check All</button>
				<div v-for="(color, index) of colors" :key="index" :class="color">
					<strong>{{ color }}</strong>
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
	@apply border border-black rounded p-2 my-1 bg-slate-100;
}
div.code-breaker-game-options button,
div.code-breaker-game-options select {
	@apply border border-black rounded px-2 py-1 bg-slate-200 h-8 m-0;
}
div.code-breaker-game-options button:hover {
	@apply bg-slate-600 text-white;
}
div.cb-options-form {
	@apply flex flex-wrap justify-between mx-2 align-top;
}
div.color-radios {
	@apply flex flex-wrap p-0;
}
div.color-radios div,
div.color-radios button {
	@apply mr-2 border rounded px-2 py-1 h-8;
}
div.color-radios strong {
	@apply inline-block mr-2;
}
</style>
