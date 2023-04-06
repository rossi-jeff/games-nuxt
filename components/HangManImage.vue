<template>
	<div class="hang-man-image">
		<div class="gallows-top" />
		<div class="gallows-left" />
		<div class="gallows-bottom" />
		<div class="rope" />
		<div class="head" id="head" />
		<div class="body" id="body" />
		<div class="left-arm" id="left-arm" />
		<div class="right-arm" id="right-arm" />
		<div class="left-leg" id="left-leg" />
		<div class="right-leg" id="right-leg" />
	</div>
</template>

<script lang="ts" setup>
const parts: string[] = [
	'head',
	'body',
	'left-arm',
	'right-arm',
	'left-leg',
	'right-leg',
]
const props = defineProps(['wrong'])

const clearParts = () => {
	let el
	for (const part of parts) {
		el = document.getElementById(part)
		if (el) el.classList.remove('visible')
	}
}

const draw = () => {
	clearParts()
	const wrong: string[] = props.wrong
		.split(',')
		.filter((l: string) => l.length > 0)
	let el
	for (let i = 0; i < wrong.length; i++) {
		const part = parts[i]
		if (part.length > 0) {
			el = document.getElementById(part)
			if (el) el.classList.add('visible')
		}
	}
}

watch(
	() => props.wrong,
	async (current, previous) => {
		console.log({ current, previous })
		draw()
	}
)
</script>

<style lang="postcss">
div.hang-man-image {
	@apply w-96 h-96 my-1 border border-black rounded relative bg-slate-100;
}
div.gallows-top {
	@apply w-48 h-6 absolute bg-amber-800 top-2 left-8;
}
div.gallows-left {
	@apply w-6 h-80 absolute bg-amber-800 top-8 left-8;
}
div.gallows-bottom {
	@apply w-80 h-6 absolute bg-amber-800 left-6 bottom-2;
}
div.rope {
	@apply w-2 h-8 absolute bg-amber-700 top-8 left-52;
}
div.head {
	@apply w-10 h-10 absolute bg-black rounded-full top-16 left-48 invisible;
}
div.body {
	@apply w-20 h-28 absolute bg-black rounded top-[6.5rem] left-[10.75rem] invisible;
}
div.left-arm {
	@apply w-16 h-4 absolute bg-black rounded top-[6.5rem] left-28 invisible;
}
div.right-arm {
	@apply w-16 h-4 absolute bg-black rounded top-[6.5rem] left-[15.5rem] invisible;
}
div.left-leg {
	@apply w-6 h-24 absolute bg-black rounded top-52 left-[10.75rem] invisible;
}
div.right-leg {
	@apply w-6 h-24 absolute bg-black rounded top-52 left-[14.25rem] invisible;
}
.visible {
	visibility: visible !important;
}
</style>
