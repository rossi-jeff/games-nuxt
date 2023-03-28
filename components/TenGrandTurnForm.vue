<template>
	<div class="ten-grand-turn-form">
		<div class="dice-row">
			<div class="dice-container">
				<h2>Roll</h2>
				<div 
					class="roll-dice" 
					@dragover="dragOver" 
					@dragenter="dragEnter" 
					@drop="drop"
				>
					<LargeDie 
						v-for="(face,index) of state.rollDice" 
						:key="index" 
						:face="face" 
						:index="index"
						:draggable="true"
						from="roll"
						@on-drag-start="dragStart"
					/>
				</div>
			</div>
			<div class="dice-container">
				<h2>Score</h2>
				<div 
					class="score-dice" 
					@dragover="dragOver" 
					@dragenter="dragEnter" 
					@drop="drop"
				>
					<LargeDie 
						v-for="(face,index) of state.scoreDice" 
						:key="index" 
						:face="face" 
						:index="index"
						:draggable="true"
						from="score"
						@on-drag-start="dragStart"
					/>
				</div>
			</div>
		</div>
		<div class="controls-row">
			<div v-if="state.options.length">
				<div class="option-row" v-for="(option,index) of state.options" :key="index">
					<div>
						<input 
							type="checkbox" 
							:value="index" 
							v-model="state.cb" 
							@change="setSelectedOptions" 
						/>
					</div>
					<div class="category">{{ option.Category }}</div>
					<div class="score">{{ option.Score }}</div>
				</div>
				<div class="mx-2">
					<button v-show="state.selected.Options.length">Score Options</button>
				</div>
			</div>
			<div v-else>
				<button @click="roll">Roll</button>
			</div>
		</div>
		
		<div>{{ props }}</div>
		<div>{{ state }}</div>
	</div>
</template>

<script lang="ts" setup>
import { TenGrandOption } from '../utils/types/ten-grand-option.type';

const props = defineProps(['tenGrand','tenGrandTurn'])
let rollDice: number[] = []
let scoreDice: number[] = []
let options: TenGrandOption[] = []
type SelectedType = {
	TurnId: number
	Dice: number[]
	Options: TenGrandOption[]
}
let selected: SelectedType = {
	TurnId: props.tenGrandTurn.id || 0,
	Dice: [],
	Options: []
}
let cb: number[] = []
const state = reactive({ rollDice, scoreDice, options, selected, cb })
const emit = defineEmits(['scoreOptions'])

const roll = async () => {
	const { tenGrand } = props
	if (!tenGrand.id) return
	const Quantity = state.rollDice.length || 6
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand/${tenGrand.id}/roll`, {
			method: 'POST',
			body: JSON.stringify({ Quantity }),
			headers: buildRequestHeaders(blankSession)
		})
		if (result.ok) {
			state.rollDice = await result.json()
			getOptions()
		}
	} catch (error) {
		console.log(error)
	}
}

const getOptions = async () => {
	const Dice = state.scoreDice
	try {
		const result = await fetch(`${apiUrl}/api/ten_grand/options`, {
			method: 'POST',
			body: JSON.stringify({ Dice }),
			headers: buildRequestHeaders(blankSession)
		})
		if (result.ok) {
			const { Options } = await result.json()
			state.options = Options
		}
	} catch (error) {
		console.log(error)
	}
}

const dragStart = (event: any) => {
	if (event.target) event.dataTransfer.setData('text', event.target.id);
	else if (event.detail) event.detail.dataTransfer.setData('text', event.detail.target.id);
};

const dragOver = (event: any) => {
	event.preventDefault();
};

const dragEnter = (event: any) => {
	let { target } = event
	if (target) {
		while (
			target && 
			!(target.classList.contains('roll-dice') || target.classList.contains('score-dice')) 
		) {
			target = target.parentElement
		}
		target.classList.add('over')
		setTimeout(() => target.classList.remove('over'),500)
	}
}

const setSelectedOptions = () => {
	state.selected.Options = []
	for (const idx of state.cb) {
		const opt = state.options[idx]
		if (opt) state.selected.Options.push(opt)
	}
}

const drop = (event: any) => {
	event.preventDefault();
	event.stopPropagation();
	const data = event.dataTransfer.getData('text');
	let [face,idx,from] = data.split('-')
	idx = parseInt(idx)
	face = parseInt(face)
	let { target } = event;
	while (
		target &&
		!(target.classList.contains('roll-dice') || target.classList.contains('score-dice'))
	) {
		target = target.parentElement;
	}
	if (target.classList.contains('roll-dice')) {
		if (from == 'roll') return
		state.rollDice.push(face)
		state.scoreDice.splice(idx,1)
	} else {
		if (from == 'score') return
		state.scoreDice.push(face)
		state.rollDice.splice(idx,1)
	}
	getOptions()
}
</script>

<style lang="postcss">
	div.dice-row {
		@apply flex flex-wrap;
	}
	div.roll-dice, div.score-dice {
		@apply flex flex-wrap h-20 min-w-[10rem] max-w-fit border border-dashed border-black rounded p-2 mx-1 my-1;
	}
	div.die-wrapper {
		@apply cursor-move;
	}
	div.option-row {
		@apply flex flex-wrap mx-2;
	}
</style>
