<template>
	<div class="code-breaker-guess-list">
		<div
			class="code-breaker-guess"
			v-for="guess of props.guesses"
			:key="guess.id"
		>
			<div class="guess-colors">
				<div v-for="(color,index) of guess.colors" :key="index" :class="color.Color"></div>
			</div>
			<div class="guess-keys">
				<div v-for="(key,index) of guess.keys" :key="index" :class="key.Key"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['guesses'])
</script>

<style lang="postcss">
div.code-breaker-guess-list {
	@apply mx-2 my-1 p-2 border border-black rounded;
}
	div.code-breaker-guess {
		@apply flex flex-wrap border border-dotted border-b-gray-400 py-1 px-2;
	}
	div.guess-colors {
		@apply flex flex-wrap;
	}
	div.guess-colors div {
		@apply w-8 h-8 rounded-full mr-4 border;
	}
	div.guess-keys {
		@apply flex flex-wrap;
	}
	div.guess-keys div {
		@apply w-4 h-4 rounded-full ml-2 border;
	}
</style>
