<template>
	<div class="free-cell-game">
		<button @click="deal">Deal</button>
		<div class="top-row">
			<div class="top-row-left">
				<div
					class="free-cell"
					id="free-cell-0"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.free.columns[0].cards"
						:key="card.id"
						:card="card"
						from="free-cell-0"
						:level="0"
						@drag-start="dragStart"
					/>
				</div>
				<div
					class="free-cell"
					id="free-cell-1"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.free.columns[1].cards"
						:key="card.id"
						:card="card"
						from="free-cell-1"
						:level="0"
						@drag-start="dragStart"
					/>
				</div>
				<div
					class="free-cell"
					id="free-cell-2"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.free.columns[2].cards"
						:key="card.id"
						:card="card"
						from="free-cell-2"
						:level="0"
						@drag-start="dragStart"
					/>
				</div>
				<div
					class="free-cell"
					id="free-cell-3"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.free.columns[3].cards"
						:key="card.id"
						:card="card"
						from="free-cell-3"
						:level="0"
						@drag-start="dragStart"
					/>
				</div>
			</div>
			<div class="top-row-right">
				<div
					class="ace-cell"
					id="ace-cell-0"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.aces.columns[0].cards"
						:key="card.id"
						:card="card"
						from="ace-cell-0"
						:level="0"
					/>
				</div>
				<div
					class="ace-cell"
					id="ace-cell-1"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.aces.columns[1].cards"
						:key="card.id"
						:card="card"
						from="ace-cell-1"
						:level="0"
					/>
				</div>
				<div
					class="ace-cell"
					id="ace-cell-2"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.aces.columns[2].cards"
						:key="card.id"
						:card="card"
						from="ace-cell-2"
						:level="0"
					/>
				</div>
				<div
					class="ace-cell"
					id="ace-cell-3"
					@dragover="dragOver"
					@dragenter="dragEnter"
					@drop="drop"
				>
					<PlayingCard
						v-for="card of state.aces.columns[3].cards"
						:key="card.id"
						:card="card"
						from="ace-cell-3"
						:level="0"
					/>
				</div>
			</div>
		</div>
		<div class="bottom-row">
			<div
				class="tableau"
				id="tableau-0"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[0].cards"
					:key="card.id"
					:card="card"
					from="tableau-0"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-1"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[1].cards"
					:key="card.id"
					:card="card"
					from="tableau-1"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-2"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[2].cards"
					:key="card.id"
					:card="card"
					from="tableau-2"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-3"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[3].cards"
					:key="card.id"
					:card="card"
					from="tableau-3"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-4"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[4].cards"
					:key="card.id"
					:card="card"
					from="tableau-4"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-5"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[5].cards"
					:key="card.id"
					:card="card"
					from="tableau-5"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-6"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[6].cards"
					:key="card.id"
					:card="card"
					from="tableau-6"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
			<div
				class="tableau"
				id="tableau-7"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[7].cards"
					:key="card.id"
					:card="card"
					from="tableau-7"
					:level="level"
					@drag-start="dragStart"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Deck } from '../../utils/deck.class'
import { CardHolder } from '../../utils/card-holder.class'

let deck = new Deck()
const tableau = new CardHolder(8)
const aces = new CardHolder(4)
const free = new CardHolder(4)
const state = reactive({ deck, tableau, aces, free })

const deal = () => {
	state.deck = new Deck()
	state.deck.shuffle()
	state.tableau.clear()
	state.aces.clear()
	state.free.clear()
	let counter = 0
	while (state.deck.cards.length > 0) {
		const card = state.deck.draw()
		if (card) {
			card.facedown = false
			if (counter >= state.tableau.columns.length) counter = 0
			state.tableau.columns[counter].cards.push(card)
			counter++
		}
	}
	setDraggable()
}

const setDraggable = () => {
	const { deck } = state
	for (let i = 0; i < state.tableau.columns.length; i++) {
		const length = state.tableau.columns[i].cards.length
		for (let j = 0; j < length; j++) {
			state.tableau.columns[i].cards[j].draggable = false
		}
		for (let k = length - 1; k > 0; k--) {
			const l = k - 1
			const cardK = state.tableau.columns[i].cards[k]
			const cardL = state.tableau.columns[i].cards[l]
			if (k == length - 1) {
				cardK.draggable = true
			}
			if (
				cardK &&
				cardL &&
				deck.color(cardK) != deck.color(cardL) &&
				deck.faces.indexOf(cardL.face) == deck.faces.indexOf(cardK.face) + 1
			) {
				cardL.draggable = true
			} else {
				break
			}
		}
	}
}

const dragStart = (event: any) => {
	if (event.target) event.dataTransfer.setData('text', event.target.id)
	else if (event.detail)
		event.detail.dataTransfer.setData('text', event.detail.target.id)
}

const dragOver = (event: any) => {
	event.preventDefault()
}

const dragEnter = (event: any) => {
	let { target } = event
	if (target) {
		let classSet = false
		while (!classSet) {
			if (
				target &&
				(target.classList.contains('tableau') ||
					target.classList.contains('free-cell') ||
					target.classList.contains('ace-cell'))
			) {
				target.classList.add('over')
				classSet = true
				setTimeout(() => {
					target.classList.remove('over')
				}, 750)
			} else if (target.parentElement) {
				target = target.parentElement
			} else {
				classSet = true
			}
		}
	}
}

const drop = (event: any) => {
	event.preventDefault()
	event.stopPropagation()
	const data = event.dataTransfer.getData('text')
	let [from, level, cardId] = data.split('_')
	level = parseInt(level)
	cardId = parseInt(cardId)
	const qty = dragCardQuantity(from, level)
	let to: string = ''
	let { target } = event
	if (target) {
		let found = false
		while (!found) {
			if (
				target &&
				(target.classList.contains('tableau') ||
					target.classList.contains('free-cell') ||
					target.classList.contains('ace-cell'))
			) {
				to = target.id
				found = true
			} else if (target.parentElement) {
				target = target.parentElement
			} else {
				found = true
			}
		}
	}
	console.log({ from, level, cardId, to, qty })
	if (canDrop(from, cardId, to, qty)) {
		console.log('can drop')
	}
}

const moveCards = (from: string, cardId: number, to: string) => {
	const fromParts = from.split('-')
	const fromWhere = fromParts.shift()
	let fromIdx = fromParts.pop()
	const toParts = to.split('-')
	const toWhere = toParts.shift()
	let toIdx = toParts.pop()
	if (fromWhere && fromIdx && toWhere && toIdx) {
		
	}
}

const canDrop = (from: string, cardId: number, to: string, qty: number) => {
	const parts = to.split('-')
	let idx: string | number | undefined = parts.pop()
	const where = parts.shift()
	if (idx && where) {
		idx = parseInt(idx)
		switch (where) {
			case 'tableau':
				return canDropTableau(from, cardId, idx)
			case 'free':
				if (qty != 1) return false
				return canDropFree(idx)
			case 'ace':
				if (qty != 1) return false
				return canDropAces(from, cardId, idx)
			default:
				return false
		}
	} else return false
}

const canDropFree = (idx: number) => {
	return state.free.columns[idx].cards.length == 0
}

const canDropAces = (from: string, cardId: number, idx: number) => {
	const length = state.aces.columns[idx].cards.length
	const lastCard = state.aces.columns[idx].cards[length - 1]
	const draggedCard = getDraggedCard(from, cardId)
	if (lastCard && draggedCard) {
		const { deck } = state
		return (
			lastCard.suit == draggedCard.suit &&
			deck.faces.indexOf(draggedCard.face) ==
				deck.faces.indexOf(lastCard.face) + 1
		)
	} else if (draggedCard && draggedCard.face == 'ace') return true
	else return false
}

const canDropTableau = (from: string, cardId: number, idx: number) => {
	const length = state.tableau.columns[idx].cards.length
	const lastCard = state.tableau.columns[idx].cards[length - 1]
	const draggedCard = getDraggedCard(from, cardId)
	if (lastCard && draggedCard) {
		const { deck } = state
		return (
			deck.color(draggedCard) != deck.color(lastCard) &&
			deck.faces.indexOf(draggedCard.face) + 1 ==
				deck.faces.indexOf(lastCard.face)
		)
	} else return draggedCard ? true : false
}

const getDraggedCard = (from: string, cardId: number) => {
	const parts = from.split('-')
	let idx: string | number | undefined = parts.pop()
	const where = parts.shift()
	if (where && idx) {
		idx = parseInt(idx)
		switch (where) {
			case 'tableau':
				return state.tableau.columns[idx].cards.find((c) => c.id == cardId)
			case 'free':
				return state.free.columns[idx].cards.find((c) => c.id == cardId)
			case 'ace':
				return state.aces.columns[idx].cards.find((c) => c.id == cardId)
			default:
				return null
		}
	} else return null
}

const dragCardQuantity = (from: string, level: number) => {
	const parts = from.split('-')
	let idx: string | number | undefined = parts.pop()
	const where = parts.shift()
	if (idx && where) {
		idx = parseInt(idx)
		let length: number
		switch (where) {
			case 'tableau':
				length = state.tableau.columns[idx].cards.length
				return length - level
			case 'free':
				length = state.free.columns[idx].cards.length
				return length - level
			case 'ace':
				length = state.aces.columns[idx].cards.length
				return length - level
			default:
				return 0
		}
	} else {
		return 0
	}
}
</script>

<style lang="postcss">
div.top-row {
	@apply flex flex-wrap justify-between mx-2 mb-4;
}
div.bottom-row {
	@apply flex flex-wrap justify-between mx-2 mb-4;
}
div.top-row-left,
div.top-row-right {
	@apply flex flex-wrap justify-between;
}
div.top-row-left div.free-cell {
	@apply mr-4;
}
div.top-row-right div.ace-cell {
	@apply ml-4;
}
div.tableau,
div.free-cell,
div.ace-cell {
	@apply w-28 h-36 p-0 border border-dashed border-black rounded text-center relative;
}
div.over {
	border: dashed red !important;
}
</style>
