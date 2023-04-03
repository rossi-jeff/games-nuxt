<template>
	<div class="code-breaker-detail">
		<!-- back link -->
		<NuxtLink to="/codebreaker/scores" class="mx-2 mb-2"
			>Back to Scores</NuxtLink
		>
		<!-- code breaker guess list-->
		<CodeBreakerGuessList
			:guesses="state.code_breaker.guesses"
			v-if="state.code_breaker.guesses && state.code_breaker.guesses.length > 0"
		/>
		<div>{{ route.params.id }}</div>
	</div>
</template>

<script lang="ts" setup>
import { CodeBreaker } from '../../utils/types/code-breaker.type'

const route = useRoute()
let code_breaker: CodeBreaker = {}
const state = reactive({ code_breaker })

const reloadGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/code_breaker/${route.params.id}`)
		if (result.ok) {
			state.code_breaker = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => reloadGame())
</script>
