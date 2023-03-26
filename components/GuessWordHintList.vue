<template>
	<div class="guess-word-hint-list">
		<div>
			<input
				type="checkbox"
				name="show-hints"
				:checked="state.show"
				@change="toggleShow"
			/>
			<label for="show-hints">Show Hints</label>
		</div>
		<div class="hint-list-scroller">
			<div class="hint" v-for="(hint, index) of props.hints" :key="index">
				{{ hint }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['showHints', 'hints'])
let show: boolean = props.showHints
const state = reactive({ show })
const emit = defineEmits(['toggleShow'])

const toggleShow = () => {
	state.show = !state.show
	const { show } = state
	emit('toggleShow', { show })
}
</script>

<style lang="postcss">
div.guess-word-hint-list {
	@apply border border-black rounded mx-2 my-1 p-2;
}
div.hint-list-scroller {
	@apply max-h-48 overflow-y-auto flex flex-wrap;
}
div.hint {
	@apply mr-4 mb-2;
}
label {
	@apply ml-2;
}
</style>
