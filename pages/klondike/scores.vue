<template>
	<div class="klondike-scores">
		<Head>
			<Title>Klondike Scores</Title>
		</Head>
		<h3>Klondike Scores</h3>
		<div v-if="state.Items && state.Items.length > 0">
			<KlondikeScoresList :items="state.Items" />
		</div>
		<PaginationControls
			:count="state.Count"
			:offset="state.Offset"
			:limit="state.Limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
		/>
		<NuxtLink to="/klondike"> &lt; Back to Game </NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import { Klondike } from '../../utils/types/klondike.type'
let Items: Klondike[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/klondike'

const limitChanged = async (event: any) => {
	const { limit } = event
	state.Offset = 0
	state.Limit = limit
	const { Items, Count, Offset, Limit } = await loadScores(
		path,
		state.Offset,
		state.Limit
	)
	state.Items = Items
	state.Count = Count
	state.Offset = Offset
	state.Limit = Limit
}

const pageChanged = async (event: any) => {
	const { current } = event
	state.Offset = (current - 1) * state.Limit
	const { Items, Count, Offset, Limit } = await loadScores(
		path,
		state.Offset,
		state.Limit
	)
	state.Items = Items
	state.Count = Count
	state.Offset = Offset
	state.Limit = Limit
}

const initialLoad = async () => {
	const { Items, Count, Offset, Limit } = await loadScores(
		path,
		state.Offset,
		state.Limit
	)
	state.Items = Items
	state.Count = Count
	state.Offset = Offset
	state.Limit = Limit
}

onMounted(() => initialLoad())
</script>

<style lang="postcss">
div.klondike-scores {
	@apply mx-2 my-2;
}
div.klondike-scores h3 {
	@apply font-bold text-lg text-indigo-600;
}
div.klondike-scores a {
	@apply font-bold text-indigo-600;
}
div.klondike-scores a:hover {
	@apply underline text-indigo-900;
}
</style>
