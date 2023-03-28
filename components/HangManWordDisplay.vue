<template>
	<div class="hang-man-word-display">
		<div class="display-letter" v-for="(l, i) of props.display" :key="i">
			{{ l }}
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['display'])
</script>

<style lang="postcss">
div.hang-man-word-display {
	@apply flex flex-wrap;
}
div.display-letter {
	@apply w-8 h-8 mr-2 border border-b-black text-center font-bold;
}
</style>
