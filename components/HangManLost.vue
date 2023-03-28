<template>
	<div class="hang-man-lost">
		The word was <strong>{{ props.word.Word }}</strong>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['word'])
</script>

<style lang="postcss">
div.hang-man-lost {
	@apply mx-2;
}
</style>
