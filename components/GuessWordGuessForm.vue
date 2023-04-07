<template>
	<div class="guess-word-guess-form">
		<div class="guess-letters">
			<div v-for="(e, index) of props.length" :key="e" class="letter">
				<input
					type="text"
					v-model="state.letters[index]"
					class="letter-input"
					maxlength="1"
					@change="checkReady"
				/>
			</div>
		</div>
		<div class="guess-button">
			<button @click="sendGuess">Send Guess</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['length'])

let letters: string[] = []
const state = reactive({ letters, ready: false })
const emit = defineEmits(['sendGuess'])

const checkReady = () => {
	if (state.letters.length != props.length) {
		state.ready = false
		return
	}
	let valid = true
	for (const letter of state.letters) {
		if (letter.length != 1 || letter == '') valid = false
	}
	state.ready = valid
}

const sendGuess = () => {
	const { letters } = state
	emit('sendGuess', { Guess: letters.join('') })
	state.letters = []
	checkReady()
}
</script>

<style lang="postcss">
div.guess-word-guess-form {
	@apply my-2 p-2 border border-black rounded flex flex-wrap bg-slate-100;
}
div.guess-letters {
	@apply flex flex-wrap;
}
input.letter-input {
	@apply w-8 h-8 border border-black rounded mr-4 text-center;
}
div.guess-word-guess-form button {
	@apply border border-black rounded px-2 py-1 bg-slate-200 mt-0;
}
div.guess-word-guess-form button:hover {
	@apply bg-slate-600 text-white;
}
</style>
