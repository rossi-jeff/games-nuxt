<template>
	<div class="yacht-details">
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
