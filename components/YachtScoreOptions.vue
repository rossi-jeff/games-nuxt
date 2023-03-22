<template>
	<div class="yacht-score-options">
		<div
			v-for="(option, index) of props.options"
			:key="index"
			:option="option"
			class="score-option"
		>
			<div class="radio">
				<input
					type="radio"
					:value="index"
					:checked="state.selected == index"
					@change="() => (state.selected = index)"
				/>
			</div>
			<div class="category">{{ option ? option.Category : '' }}</div>
			<div class="score">{{ option ? option.Score : 0 }}</div>
		</div>
		<button @click="scoreTurn">Score Turn</button>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['options'])
const state = reactive({ selected: 0 })
const emit = defineEmits(['score'])

const scoreTurn = () => {
	const option = props.options[state.selected]
	const { Category } = option
	emit('score', { Category })
}
</script>

<style lang="postcss">
div.yacht-score-options {
	@apply border border-black rounded p-2;
}
div.score-option {
	@apply flex flex-wrap px-2 border border-dashed border-b-gray-500;
}
div.category {
	@apply flex-grow pl-2;
}
button {
	@apply border border-black rounded my-1 px-2 py-1;
}
button:hover {
	@apply bg-yellow-200;
}
</style>
