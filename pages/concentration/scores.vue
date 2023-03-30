<template>
	<div class="concentration-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<ConcentrationScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Concentration } from '../../utils/types/concentration.type'

let Items: Concentration[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/free_cell'

state = await loadScores(path, state.Offset, state.Limit)
</script>
