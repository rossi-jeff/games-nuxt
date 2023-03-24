<template>
	<div class="klondike-scores">
		<div v-if="state.Items && state.Items.length > 0">
			<KlondikeScoresList :items="state.Items" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Klondike } from '../../utils/types/klondike.type'
let Items: Klondike[] = reactive([])
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 })

const loadScores = async () => {
	const { Offset, Limit } = state
	const path = '/api/klondike'
	const params: { [key: string]: number } = { Offset, Limit }
	const url = new URL(path, apiUrl)
	for (const key in params) {
		url.searchParams.append(key, params[key].toString())
	}
	try {
		const result = await fetch(url)
		if (result.ok) {
			state = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

await loadScores()
</script>
