<template>
	<div class="guess-word-game-options">
		<div class="length-select-div">
			<select v-model="state.Length">
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
	@apply border border-black rounded p-2 mx-2 my-1 flex flex-wrap;
}
div.length-select-div {
	@apply mr-4;
}
</style>
