<template>
	<div class="ten-grand-scores">
		<h3>Ten Grand Scores</h3>
		<div v-if="state.Items && state.Items.length > 0">
			<TenGrandScoresList
				:items="state.Items"
				label="View"
				@follow-link="followLink"
			/>
		</div>
		<PaginationControls
			:count="state.Count"
			:offset="state.Offset"
			:limit="state.Limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
		/>
		<NuxtLink to="/tengrand"> &lt; Back to Game </NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import { TenGrand } from '~~/utils/types/ten-grand.type'

let Items: TenGrand[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })
const path = '/api/ten_grand'
const router = useRouter()

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

const followLink = (event: any) => {
	const { id } = event
	router.push(`/tengrand/${id}`)
}

onMounted(() => initialLoad())
</script>

<style lang="postcss">
div.ten-grand-scores {
	@apply mx-2 my-2;
}
div.ten-grand-scores h3 {
	@apply font-bold text-lg text-indigo-600;
}
div.ten-grand-scores a {
	@apply font-bold text-indigo-600;
}
div.ten-grand-scores a:hover {
	@apply underline text-indigo-900;
}
</style>
