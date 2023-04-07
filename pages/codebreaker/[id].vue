<template>
	<div class="code-breaker-detail">
		<Head>
			<Title>Code Breaker Score Detail</Title>
		</Head>
		<!-- back link -->
		<NuxtLink to="/codebreaker/scores"> &lt; Back to Scores</NuxtLink>
		<!-- code breaker guess list-->
		<CodeBreakerGuessList
			:guesses="state.code_breaker.guesses"
			v-if="state.code_breaker.guesses && state.code_breaker.guesses.length > 0"
		/>
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

<style lang="postcss">
div.code-breaker-detail {
	@apply mx-2 my-2;
}
div.code-breaker-detail a {
	@apply font-bold text-indigo-600;
}
div.code-breaker-detail a:hover {
	@apply underline text-indigo-900;
}
</style>
