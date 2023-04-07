<template>
	<div class="pagination-controls">
		<div class="pagination-row">
			<div class="limit-controls">
				<label for="per-page-select">Per Page</label>
				<select
					name="per-page-selecct"
					v-model="state.limit"
					@change="limitChanged"
				>
					<option
						v-for="p of perPage"
						:key="p"
						:value="p"
						:selected="p == state.limit"
					>
						{{ p }}
					</option>
				</select>
			</div>
			<div class="page-controls">
				<div class="page" v-for="page of state.pages" :key="page">
					<button v-if="page != state.current" @click="pageChanged(page)">
						{{ page }}
					</button>
					<button class="current" v-else :disabled="true">{{ page }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	count: { type: Number, required: true },
	limit: { type: Number, required: true },
	offset: { type: Number, required: true },
})
let count = props.count
let limit = props.limit
let offset = props.offset
let pages: number[] = []
let current = 1
const perPage: number[] = [5, 10, 25]
const state = reactive({ count, limit, offset, current, pages })
const emit = defineEmits(['limitChanged', 'pageChanged'])

const buildPages = () => {
	const { count, limit } = state
	let page = 1
	let counter = 0
	state.pages = []
	if (count > limit) {
		while (counter <= count) {
			state.pages.push(page)
			page++
			counter += limit
		}
	} else state.pages.push(page)
}

const limitChanged = () => {
	const { limit } = state
	emit('limitChanged', { limit })
}

const pageChanged = (page: number) => {
	let current = (state.current = page)
	emit('pageChanged', { current })
}

watch(
	() => [props.count, props.limit, props.offset],
	() => {
		state.count = props.count
		state.limit = props.limit
		state.offset = props.offset
		state.current = Math.floor(state.offset / state.limit) + 1
		buildPages()
	}
)

onMounted(() => buildPages())
</script>

<style lang="postcss">
div.pagination-row {
	@apply flex flex-wrap justify-between my-2;
}
div.page-controls {
	@apply flex flex-wrap;
}
div.page-controls button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200 ml-2;
}
div.page-controls button:hover {
	@apply bg-slate-600 text-white;
}
div.page-controls button.current {
	@apply bg-slate-900 text-white;
}
div.limit-controls select {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200 ml-2;
}
</style>
