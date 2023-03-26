<template>
	<div class="guess-word-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<GuessWordScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { GuessWord } from '~~/utils/types/guess-word.type'

let Items: GuessWord[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/guess_word'

state = await loadScores(path, state.Offset, state.Limit)
</script>
