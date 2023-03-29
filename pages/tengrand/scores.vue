<template>
	<div class="ten-grand-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<TenGrandScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { TenGrand } from '~~/utils/types/ten-grand.type';

let Items: TenGrand[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/ten_grand'

state = await loadScores(path, state.Offset, state.Limit)
</script>
