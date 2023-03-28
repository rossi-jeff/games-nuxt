<template>
	<div class="sea-battle-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<SeaBattleScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SeaBattle } from '../../utils/types/sea-battle.type'

let Items: SeaBattle[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/sea_battle'

state = await loadScores(path, state.Offset, state.Limit)
</script>
