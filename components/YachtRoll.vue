<template>
	<div class="yacht-roll">
		<h2>{{ props.title }}</h2>
		<div class="die-container">
			<div v-for="(face, index) of dice" :key="index" class="roll-die">
				<LargeDie :face="face" :index="index" />
				<input
					type="checkbox"
					:value="index"
					:checked="state.selected.includes(index)"
					v-model="state.selected"
					:disabled="props.flag == true"
					@change="updateKeep"
				/>
			</div>
		</div>
		<div v-if="props.flag == false">
			<button @click="rollDie">{{ props.label }}</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	dieRoll: { type: String },
	title: { type: String },
	label: { type: String },
	flag: { type: Boolean },
})
const dice = computed(() =>
	props.dieRoll ? props.dieRoll.split(',').map((d) => parseInt(d)) : []
)
let selected: Number[] = reactive([])
let Keep: Number[] = reactive([])
const state = reactive({ selected, Keep })
const emit = defineEmits(['roll'])

const updateKeep = () => {
	state.Keep = []
	const Dice: Number[] = props.dieRoll
		? props.dieRoll.split(',').map((d) => parseInt(d))
		: []
	for (const idx of state.selected) {
		if (Dice && Dice[idx.valueOf()]) state.Keep.push(Dice[idx.valueOf()])
	}
}

const rollDie = () => {
	const { Keep } = state
	emit('roll', { Keep })
}
</script>

<style lang="postcss">
div.yacht-roll {
	@apply border border-black rounded p-2;
}
div.die-container {
	@apply flex flex-wrap justify-between;
}
div.roll-die {
	@apply p-2 text-center w-20;
}
h2 {
	@apply font-bold text-lg ml-2;
}
button {
	@apply border border-black rounded my-1 px-2 py-1;
}
button:hover {
	@apply bg-yellow-200;
}
</style>
