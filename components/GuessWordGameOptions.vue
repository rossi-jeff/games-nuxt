<template>
	<div class="guess-word-game-options">
		<div class="length-select-div">
			<label for="word-length">Length</label>
			<select name="word-lenhgth" v-model="state.Length">
				<option
					v-for="length of lengths"
					:key="length"
					:value="length"
					:selected="length == state.Length"
				>
					{{ length }}
				</option>
			</select>
		</div>
		<div>
			<button @click="startGame">Start Game</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const lengths: number[] = [4, 5, 6, 7, 8]
const state = reactive({ Length: 5 })
const emit = defineEmits(['startGame'])

const startGame = () => {
	const { Length } = state
	emit('startGame', { Length })
}
</script>

<style lang="postcss">
div.guess-word-game-options {
	@apply border border-black rounded p-2 my-1 flex flex-wrap bg-slate-100;
}
div.length-select-div {
	@apply mr-4;
}
div.guess-word-game-options select,
div.guess-word-game-options button {
	@apply border border-black rounded px-2 py-1 bg-slate-200 mt-0;
}
div.guess-word-game-options button:hover {
	@apply bg-slate-600 text-white;
}
div.guess-word-game-options label {
	@apply inline-block font-bold mr-2;
}
</style>
