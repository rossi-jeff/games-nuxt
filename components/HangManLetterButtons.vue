<template>
	<div class="hang-man-letter-buttons">
		<button
			v-for="l of letters"
			:key="l"
			:class="buttonClass(l)"
			:disabled="buttonDisabled(l)"
			@click="guessLetter(l)"
		>
			{{ l }}
		</button>
	</div>
</template>

<script lang="ts" setup>
const letters = alphabet.toUpperCase().split('')
const props = defineProps(['correct', 'wrong'])
const emit = defineEmits(['guessLetter'])

const buttonClass = (Letter: string) => {
	const correct = props.correct.toString().toUpperCase().split('')
	const wrong = props.wrong.toString().toUpperCase().split('')
	if (correct.includes(Letter)) return 'Correct'
	if (wrong.includes(Letter)) return 'Wrong'
	return ''
}

const buttonDisabled = (Letter: string) => {
	const correct = props.correct.toString().toUpperCase().split('')
	const wrong = props.wrong.toString().toUpperCase().split('')
	if (correct.includes(Letter) || wrong.includes(Letter)) return true
	return false
}

const guessLetter = (Letter: string) => {
	emit('guessLetter', { Letter })
}
</script>

<style lang="postcss">
div.hang-man-letter-buttons {
	@apply flex flex-wrap my-2;
}
div.hang-man-letter-buttons button {
	@apply border border-black rounded px-2 py-1 bg-slate-200 mr-2 mb-2;
}
div.hang-man-letter-buttons button:hover {
	@apply bg-slate-600 text-white;
}
div.hang-man-letter-buttons button.Correct {
	@apply bg-green-200 border-green-700;
}
div.hang-man-letter-buttons button.Wrong {
	@apply bg-red-200 border-red-700 line-through;
}
</style>
