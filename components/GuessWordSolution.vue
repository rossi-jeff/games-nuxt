<template>
	<div class="guess-word-solution">
		The word was
		<strong>{{ word ? word.Word : 'N/A' }}</strong>
	</div>
</template>

<script lang="ts" setup>
import { Word } from '../utils/types/word.type'

const props = defineProps(['word'])
let word: Word = {}

watch(
	() => props.word,
	() => {
		word = props.word
	}
)

onMounted(() => {
	word = props.word
})
</script>

<style lang="postcss">
div.guess-word-solution {
	@apply border border-black rounded p-2 bg-slate-100;
}
</style>
