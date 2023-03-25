<template>
	<div class="code-breaker-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<CodeBreakeerScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CodeBreaker } from '../../utils/types/code-breaker.type'

let Items: CodeBreaker[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/code_breaker'

state = await loadScores(path, state.Offset, state.Limit)
</script>
