<template>
	<div class="hang-man-game-options">
		<div class="hang-man-options-form">
			<div class="min-select-div">
				<label for="min-select">Min</label>
				<select name="min-select" v-model="state.Min">
					<option
						v-for="l of lengths"
						:key="l"
						:value="l"
						:selected="l == state.Min"
					>
						{{ l }}
					</option>
				</select>
			</div>
			<div class="max-select-div">
				<label for="max-select">Max</label>
				<select name="max-select" v-model="state.Max">
					<option
						v-for="l of lengths"
						:key="l"
						:value="l"
						:selected="l == state.Max"
					>
						{{ l }}
					</option>
				</select>
			</div>
			<div class="ml-2">
				<button @click="getWord">Start Game</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const lengths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let Min = 6
let Max = 12
const state = reactive({ Min, Max })
const emit = defineEmits(['getWord'])

const getWord = () => {
	const { Min, Max } = state
	emit('getWord', { Min, Max })
}
</script>

<style lang="postcss">
div.hang-man-options-form {
	@apply flex flex-wrap;
}
div.hang-man-options-form select,
div.hang-man-options-form button {
	@apply border border-black rounded px-2 py-1 bg-slate-200 mr-2;
}
div.hang-man-options-form button:hover {
	@apply bg-slate-600 text-white;
}
div.hang-man-options-form button {
	@apply mt-0;
}
div.hang-man-options-form label {
	@apply inline-block font-bold mr-2;
}
div.hang-man-game-options {
	@apply my-2;
}
</style>
