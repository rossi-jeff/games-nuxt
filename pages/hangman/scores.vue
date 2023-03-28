<template>
	<div class="hang-man-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<HangManScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { HangMan } from '../../utils/types/hang-man.type'

let Items: HangMan[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/guess_word'

state = await loadScores(path, state.Offset, state.Limit)
</script>
