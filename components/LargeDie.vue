<template>
	<div :id="id" class="w-16 h-16">
		<img :src="src" :alt="alt" class="w-16 h-16" draggable="false" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	face: { type: Number, required: true },
	index: { type: Number, required: true },
})
const src = computed(() => `/dice/dice-${props.face}.svg`)
const alt = computed(() => `die-${props.face}`)
const id = computed(() => `die-${props.face}-${props.index}`)
</script>
