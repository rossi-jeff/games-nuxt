<template>
	<div class="code-breaker-guess-form">
		<div class="form-color-selects">
			<div
				v-for="(e, index) in props.columns"
				:key="e"
				class="color-select-div"
			>
				<select
					v-model="state.selected[index]"
					@change="checkReady"
					class="color-select"
					:id="`color-select-${index}`"
				>
					<option
						v-for="color of props.available"
						:key="color"
						:value="color"
						:class="color"
						:selected="color == state.selected[index]"
					>
						{{ color }}
					</option>
				</select>
			</div>
		</div>
		<div class="w-36 text-right">
			<button v-show="state.ready" :disabled="!state.ready" @click="sendGuess">
				Send Guess
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['available', 'columns'])
let selected: string[] = []
const state = reactive({ selected, ready: false })
const emit = defineEmits(['sendGuess'])

const checkReady = (ev: any) => {
	if (ev.target)
		ev.target.className = ev.target.options[ev.target.selectedIndex].className
	if (state.selected.length != props.columns) {
		state.ready = false
		return
	}
	let valid = true
	for (const color of state.selected) {
		if (color == '' || color == undefined) valid = false
	}
	state.ready = valid
}

const sendGuess = () => {
	const { selected } = state
	state.selected = []
	const selectElements = document.getElementsByTagName('select')
	for (let i = 0; i < selectElements.length; i++) {
		const select = selectElements[i]
		if (select) select.className = ''
	}
	emit('sendGuess', { selected })
}
</script>

<style lang="postcss">
div.code-breaker-guess-form {
	@apply flex flex-wrap border justify-between border-black rounded p-2 my-1 bg-slate-100;
}
div.form-color-selects {
	@apply flex flex-wrap justify-between flex-grow p-2;
}
div.form-color-selects select {
	@apply border border-black rounded px-2 py-1;
}
div.code-breaker-guess-form button {
	@apply border border-black rounded px-2 py-1 bg-slate-200;
}
div.code-breaker-guess-form button:hover {
	@apply bg-slate-600 text-white;
}
</style>
