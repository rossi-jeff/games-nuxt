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
	@apply flex flex-wrap mx-2;
}
div.hang-man-letter-buttons button {
	@apply mr-2 mb-2;
}
.Correct {
	@apply bg-green-200 border-green-700;
}
.Wrong {
	@apply bg-red-200 border-red-700 line-through;
}
</style>
