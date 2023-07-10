<template>
	<div class="poker-squares-scores">
		<Head>
			<Title>Poker Squares Scores</Title>
		</Head>
		<h3>Poker Square Scores</h3>

		<div v-if="state.Items && state.Items.length > 0">
			<PokeSquareScoreList :items="state.Items" />
		</div>

		<PaginationControls
			:count="state.Count"
			:offset="state.Offset"
			:limit="state.Limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
		/>
		<NuxtLink to="/pokersquares"> &lt; Back to Game </NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import { PokerSquare } from '../../utils/types/poker-square.type'

let Items: PokerSquare[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/poker_square'

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
div.poker-squares-scores {
	@apply mx-2 my-2;
}
div.poker-squares-scores h3 {
	@apply font-bold text-lg text-indigo-600;
}
div.poker-squares-scores a {
	@apply font-bold text-indigo-600;
}
div.poker-squares-scores a:hover {
	@apply underline text-indigo-900;
}
</style>
