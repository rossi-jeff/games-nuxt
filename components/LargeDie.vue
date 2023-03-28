<template>
	<div :id="id" class="die-wrapper" :draggable="props.draggable" @dragstart="onDragStart">
		<img :src="src" :alt="alt" class="die-face" draggable="false" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	face: { type: Number, required: true },
	index: { type: Number, required: true },
	draggable: { type: Boolean, required: true },
	from: { type: String, required: false }
})
const src = computed(() => `/dice/dice-${props.face}.svg`)
const alt = computed(() => `die-${props.face}`)
const id = computed(() => `${props.face}-${props.index}-${props.from}`)

const emit = defineEmits(['onDragStart'])

const onDragStart = (event: any) => {
	if (!props.draggable) return
	emit("onDragStart", event)
}
</script>

<style lang="postcss">
div.die-wrapper {
	@apply w-16 h-16 p-0;
}
img.die-face {
	@apply w-16 h-16;
}
</style>