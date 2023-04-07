<template>
	<div class="ten-grand-details">
		<Head>
			<Title>Ten Grand Score Detail</Title>
		</Head>
		<NuxtLink to="/tengrand/scores"> &lt; Back to Scores </NuxtLink>
		<!-- turn list -->
		<TenGrandTurnList
			:turns="state.ten_grand.turns"
			v-if="
				state.ten_grand && state.ten_grand.turns && state.ten_grand.turns.length
			"
		/>
	</div>
</template>

<script lang="ts" setup>
import { GameStatus } from '../../utils/enum/game-status.enum'
import { TenGrand } from '../../utils/types/ten-grand.type'

const route = useRoute()
let status: GameStatus | undefined
let ten_grand: TenGrand = {}
const state = reactive({ ten_grand, status })

const loadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand/${route.params.id}`)
		if (result.ok) {
			state.ten_grand = await result.json()
			state.status = state.ten_grand.Status
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => loadGame())
</script>

<style lang="postcss">
div.ten-grand-details {
	@apply mx-2 my-2;
}
div.ten-grand-details a {
	@apply font-bold text-indigo-600;
}
div.ten-grand-details a:hover {
	@apply underline text-indigo-900;
}
</style>
