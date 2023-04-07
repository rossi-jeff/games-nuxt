<template>
	<div class="yacht-details">
		<Head>
			<Title>Yacht Score Detail</Title>
		</Head>
		<NuxtLink to="/yacht/scores"> &lt; Back to Scores </NuxtLink>
		<YachtScoreCard :turns="state.yacht.turns" :total="state.yacht.Total" />
	</div>
</template>

<script lang="ts" setup>
import { Yacht } from '../../utils/types/yacht.type'

const route = useRoute()
let yacht: Yacht = {}
const state = reactive({ yacht })

const loadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/yacht/${route.params.id}`)
		if (result.ok) {
			state.yacht = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => loadGame())
</script>

<style lang="postcss">
div.yacht-details {
	@apply mx-2 my-2;
}
div.yacht-details a {
	@apply font-bold text-indigo-600;
}
div.yacht-details a:hover {
	@apply underline text-indigo-900;
}
</style>
