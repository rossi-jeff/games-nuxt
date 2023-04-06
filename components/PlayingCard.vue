<template>
	<div
		class="playing-card"
		:draggable="props.card && props.card.draggable"
		:id="id"
		@click="onClick"
		@dragstart="onDragStart"
	>
		<div
			class="playing-card-wrapper"
			v-if="props.card"
			draggable="false"
			@click="onClick"
		>
			<img
				:src="src"
				:alt="alt"
				class="playing-card-img"
				draggable="false"
				@click="onClick"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['card', 'from', 'level', 'index'])
const src = computed(() => {
	const { card } = props
	if (!card) return ''
	return card.facedown ? card.backSrc : card.src
})
const alt = computed(() => {
	const { card, from, level } = props
	if (!card) return ''
	return card.facedown
		? `card-${from}-${level}`
		: `${card.face} of ${card.suit}`
})
const id = `${props.from}_${props.level}_${props.card ? props.card.id : '-'}_${
	props.index ? props.index : 0
}`
let timeout: ReturnType<typeof setTimeout> | undefined
const emit = defineEmits(['click', 'dragStart'])

const onClick = () => {
	const { card } = props
	if (!card || !card.clickable || !id) return
	if (timeout) clearTimeout(timeout)
	timeout = setTimeout(() => {
		emit('click', { id: id })
	}, 100)
}

const onDragStart = (ev: any) => {
	const { card } = props
	if (!card || !card.draggable) return
	emit('dragStart', ev)
}

const setTop = () => {
	const { level } = props
	if (!level) return
	const top = parseInt(level) * 1.5 + 0.5
	const el = document.getElementById(String(id))
	if (el) el.style.top = `${top}rem`
}

onMounted(() => setTimeout(() => setTop(), 25))
</script>

<style lang="postcss">
div.playing-card {
	@apply w-28 h-36 p-0 absolute top-2 left-2;
}
div.playing-card-wrapper {
	@apply w-24 h-32 p-0;
}
img.playing-card-img {
	@apply w-24 h-32 cursor-move;
}
</style>
