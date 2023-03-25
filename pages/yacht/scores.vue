<template>
	<div class="yacht-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<YachtScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Yacht } from '../../utils/types/yacht.type'
let Items: Yacht[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/yacht'

state = await loadScores(path, state.Offset, state.Limit)
</script>
