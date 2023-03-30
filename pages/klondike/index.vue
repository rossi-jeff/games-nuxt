<template>
	<div class="klondike-game" v-if="state.rendered">
		<div class="header-row">
			<div class="buttons">
				<button @click="deal" v-if="state.status != GameStatus.Playing">
					Deal
				</button>
				<button v-if="state.status == GameStatus.Playing" @click="quit">
					Quit
				</button>
				<button v-if="state.autocomplete" @click="autoComplete">
					Auto Complete
				</button>
			</div>
			<div>
				<strong>Moves</strong>
				{{ state.moves }}
			</div>
			<div>
				<strong>Time</strong>
				{{ formatElapsedSeconds(state.elapsed) }}
			</div>
		</div>
		<div class="top-row">
			<div class="top-row-left">
				<div class="stock" id="stock" @click="stockCellClicked">
					<PlayingCard
						v-for="card of state.stock.columns[0].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="stock"
						@click="stockCardClicked"
					/>
				</div>
				<div class="waste" id="waste">
					<PlayingCard
						v-for="card of state.waste.columns[0].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="waste"
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
						:level="0"
						from="ace-cell-0"
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
						:level="0"
						from="ace-cell-1"
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
						:level="0"
						from="ace-cell-2"
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
						:level="0"
						from="ace-cell-3"
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
					:level="level"
					from="tableau-0"
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
					:level="level"
					from="tableau-1"
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
					:level="level"
					from="tableau-2"
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
					:level="level"
					from="tableau-3"
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
					:level="level"
					from="tableau-4"
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
					:level="level"
					from="tableau-5"
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
					:level="level"
					from="tableau-6"
					@drag-start="dragStart"
				/>
			</div>
		</div>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/klondike/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { GameStatus } from '../../utils/enum/game-status.enum'
import { Klondike } from '../../utils/types/klondike.type'

let deck = new Deck()
const tableau = new CardHolder(7)
const aces = new CardHolder(4)
const stock = new CardHolder(1)
const waste = new CardHolder(1)
let klondike: Klondike = {}
let status: GameStatus | undefined
const state = reactive({
	deck,
	tableau,
	aces,
	stock,
	waste,
	klondike,
	status,
	moves: 0,
	elapsed: 0,
	autocomplete: false,
	rendered: true,
})
let timeout: ReturnType<typeof setTimeout> | undefined
let interval: ReturnType<typeof setInterval> | undefined
let start: number

const deal = () => {
	removeCards()
	start = Date.now()
	state.status = GameStatus.Playing
	state.moves = 0
	state.elapsed = 0
	state.autocomplete = false
	for (let i = 0; i < 7; i++) {
		for (let j = i; j < 7; j++) {
			const card = state.deck.draw()
			if (card) {
				if (i === j) {
					card.facedown = false
					card.draggable = true
				}
				state.tableau.columns[j].cards.push(card)
			}
		}
	}
	while (state.deck.cards.length) {
		const card = state.deck.draw()
		if (card) {
			card.clickable = true
			state.stock.columns[0].cards.push(card)
		}
	}
	newGame()
}

const removeCards = () => {
	const cards = document.getElementsByClassName('playing-card')
	while (cards.length) {
		const card = cards[0]
		const el = document.getElementById(card.id)
		if (el) {
			el.remove()
		}
	}
	state.deck = new Deck()
	state.deck.shuffle()
	state.tableau.clear()
	state.aces.clear()
	state.stock.clear()
	state.waste.clear()
	toggleRendered()
}

const toggleRendered = () => {
	state.rendered = false
	setTimeout(() => (state.rendered = true), 25)
}

const newGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/klondike`, {
			method: 'POST',
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			state.klondike = await result.json()
			clock()
		}
	} catch (error) {
		console.log(error)
	}
}

const clock = () => {
	state.elapsed = 0
	interval = setInterval(() => {
		state.elapsed = Math.round((Date.now() - start) / 1000)
	}, 1000)
}

const stockCardClicked = (event: any) => {
	const { id } = event
	if (!id) return
	let [from, _, cardId] = id.split('_')
	if (from != 'stock') return
	cardId = parseInt(cardId)
	const idx = state.stock.columns[0].cards.findIndex((c) => c.id == cardId)
	if (idx == state.stock.columns[0].cards.length - 1) {
		const card = state.stock.columns[0].cards.pop()
		if (card) {
			card.facedown = false
			card.clickable = false
			card.draggable = true
			state.waste.columns[0].cards.push(card)
			state.moves++
			// toggleRendered()
		}
	}
}

const stockCellClicked = () => {
	if (state.stock.columns[0].cards.length) return
	while (state.waste.columns[0].cards.length) {
		const card = state.waste.columns[0].cards.pop()
		if (card) {
			card.facedown = true
			card.draggable = false
			card.clickable = true
			state.stock.columns[0].cards.push(card)
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
	const qty = dragCardQuantity(from, level, cardId)
	let to: string = ''
	let { target } = event
	if (target) {
		let found = false
		while (!found) {
			if (
				target &&
				(target.classList.contains('tableau') ||
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
	if (['stock', 'waste'].includes(to)) return
	if (canDrop(from, cardId, to, qty)) {
		moveCards(from, cardId, to)
	}
}

const canDrop = (from: string, cardId: number, to: string, qty: number) => {
	const parts = to.split('-')
	const where = parts.shift()
	if (where == 'waste' || where == 'stock') return false
	let idx: string | number | undefined = parts.pop()
	if (idx && where) {
		idx = parseInt(idx)
		switch (where) {
			case 'tableau':
				return canDropTableau(from, cardId, idx)
			case 'ace':
				if (qty != 1) return false
				return canDropAces(from, cardId, idx)
			default:
				return false
		}
	} else return false
}

const canDropTableau = (from: string, cardId: number, idx: number) => {
	const length = state.tableau.columns[idx].cards.length
	const lastCard = state.tableau.columns[idx].cards[length - 1]
	const draggedCard = getDraggedCard(from, cardId)
	if (lastCard && draggedCard) {
		const { deck } = state
		return (
			deck.color(lastCard) != deck.color(draggedCard) &&
			deck.faces.indexOf(draggedCard.face) + 1 ==
				deck.faces.indexOf(lastCard.face)
		)
	} else if (draggedCard) {
		return draggedCard.face == 'king'
	} else return false
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
	} else if (draggedCard) {
		return draggedCard.face == 'ace'
	} else return false
}

const getDraggedCard = (from: string, cardId: number) => {
	const parts = from.split('-')
	const where = parts.shift()
	let idx: string | number | undefined = parts.pop()
	if (where) {
		switch (where) {
			case 'tableau':
				if (idx == undefined) return null
				return state.tableau.columns[parseInt(idx.toString())].cards.find(
					(c) => c.id == cardId
				)
			case 'waste':
				return state.waste.columns[0].cards.find((c) => c.id == cardId)
			case 'ace':
				if (idx == undefined) return null
				return state.aces.columns[parseInt(idx.toString())].cards.find(
					(c) => c.id == cardId
				)
			default:
				return null
		}
	} else return null
}

const moveCards = (from: string, cardId: number, to: string) => {
	const fromParts = from.split('-')
	const fromWhere = fromParts.shift()
	let fromIdx: string | number | undefined = fromParts.pop()
	const toParts = to.split('-')
	const toWhere = toParts.shift()
	let toIdx: string | number | undefined = toParts.pop()
	const toMove = []
	let idx: number = -1,
		card,
		cards = []
	if (fromWhere && toWhere) {
		switch (fromWhere) {
			case 'waste':
				idx = state.waste.columns[0].cards.findIndex((c) => c.id == cardId)
				if (idx > -1) {
					while (state.waste.columns[0].cards.length > idx) {
						card = state.waste.columns[0].cards.pop()
						if (card) toMove.push(card)
					}
				}
				break
			case 'tableau':
				if (fromIdx == undefined) break
				cards = state.tableau.columns[parseInt(fromIdx.toString())].cards
				idx = cards.findIndex((c) => c.id == cardId)
				if (idx > -1) {
					while (cards.length > idx) {
						card = cards.pop()
						if (card) toMove.push(card)
					}
					if (cards.length) {
						card = cards[cards.length - 1]
						if (card) {
							card.facedown = false
							card.draggable = true
						}
					}
				}
				break
			case 'ace':
				if (fromIdx == undefined) break
				cards = state.aces.columns[parseInt(fromIdx.toString())].cards
				idx = cards.findIndex((c) => c.id == cardId)
				if (idx > -1) {
					while (cards.length > idx) {
						card = cards.pop()
						if (card) toMove.push(card)
					}
				}
				break
		}
		switch (toWhere) {
			case 'waste':
				break
			case 'tableau':
				if (toIdx == undefined) break
				cards = state.tableau.columns[parseInt(toIdx.toString())].cards
				while (toMove.length) {
					card = toMove.pop()
					if (card) {
						cards.push(card)
					}
				}
				break
			case 'ace':
				if (toIdx == undefined) break
				cards = state.aces.columns[parseInt(toIdx.toString())].cards
				while (toMove.length) {
					card = toMove.pop()
					if (card) {
						card.draggable = false
						cards.push(card)
					}
				}
				break
		}
		state.moves++
		setStatus()
		// toggleRendered()
	}
}

const dragCardQuantity = (from: string, level: number, cardId: number) => {
	const parts = from.split('-')
	const where = parts.shift()
	let idx: string | number | undefined = parts.pop()
	idx = idx ? parseInt(idx) : 0
	if (where) {
		let length: number
		switch (where) {
			case 'tableau':
				length = state.tableau.columns[idx].cards.length
				return length - level
			case 'waste':
				length = state.waste.columns[0].cards.length
				const idxC = state.waste.columns[0].cards.findIndex(
					(c) => c.id == cardId
				)
				return length - idxC
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

const quit = () => {
	if (interval) clearInterval(interval)
	state.status = GameStatus.Lost
	removeCards()
	updateGame()
}

const setStatus = () => {
	const stockCount = state.stock.columns[0].cards.length
	const wasteCount = state.waste.columns[0].cards.length
	let faceDownCount = 0
	for (let i = 0; i < state.tableau.columns.length; i++) {
		for (let j = 0; j < state.tableau.columns[i].cards.length; j++) {
			const card = state.tableau.columns[i].cards[j]
			if (card && card.facedown) faceDownCount++
		}
	}
	state.autocomplete = stockCount == 0 && wasteCount == 0 && faceDownCount == 0
	let aceCount = 0
	for (let i = 0; i < state.aces.columns.length; i++) {
		aceCount += state.aces.columns[i].cards.length
	}
	if (aceCount == 52) {
		if (interval) clearInterval(interval)
		state.status = GameStatus.Won
		updateGame()
	}
}

const autoComplete = () => {
	if (interval) clearInterval(interval)
	timeout = setTimeout(() => autoMoveCard(), 250)
}

const autoMoveCard = () => {
	if (timeout) clearTimeout(timeout)
	const { deck } = state
	let fromIdx: number | undefined,
		aceIdx: number | undefined,
		lowestCard,
		lastCard,
		length: number
	for (let i = 0; i < state.tableau.columns.length; i++) {
		lastCard = undefined
		length = state.tableau.columns[i].cards.length
		if (length) lastCard = state.tableau.columns[i].cards[length - 1]
		if (
			lastCard &&
			(!lowestCard ||
				deck.faces.indexOf(lastCard.face) < deck.faces.indexOf(lowestCard.face))
		) {
			lowestCard = lastCard
			fromIdx = i
		}
	}
	if (lowestCard && fromIdx != undefined) {
		aceIdx = undefined
		for (let i = 0; i < state.aces.columns.length; i++) {
			lastCard = undefined
			length = state.aces.columns[i].cards.length
			if (length) lastCard = state.aces.columns[i].cards[length - 1]
			if (
				lastCard &&
				lastCard.suit == lowestCard.suit &&
				deck.faces.indexOf(lowestCard.face) ==
					deck.faces.indexOf(lastCard.face) + 1
			) {
				aceIdx = i
			}
		}
		if (aceIdx != undefined) {
			let card = state.tableau.columns[fromIdx].cards.pop()
			if (card) {
				card.draggable = false
				state.aces.columns[aceIdx].cards.push(card)
				timeout = setTimeout(() => autoMoveCard(), 150)
				state.moves++
			}
		}
	} else {
		state.autocomplete = false
		let aceCount = 0
		for (let i = 0; i < state.aces.columns.length; i++) {
			aceCount += state.aces.columns[i].cards.length
		}
		if (aceCount == 52) {
			state.status = GameStatus.Won
			state.elapsed = Math.round((Date.now() - start) / 1000)
			updateGame()
		}
	}
}

const updateGame = async () => {
	const { klondike, moves: Moves, elapsed: Elapsed, status: Status } = state
	if (!klondike.id) return
	try {
		const result = await fetch(`${apiUrl}/api/klondike/${klondike.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ Moves, Elapsed, Status }),
			headers: buildRequestHeaders(blankSession),
		})
		if (result.ok) {
			state.klondike = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => deck.preload())
</script>

<style lang="postcss">
div.klondike-game {
	@apply p-2;
}
div.header-row {
	@apply mx-2 flex flex-wrap justify-between mb-2;
}
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
div.top-row-right div.ace-cell {
	@apply ml-4;
}
div.tableau,
div.stock,
div.waste,
div.ace-cell {
	@apply w-28 h-36 p-0 border border-dashed border-black rounded text-center relative;
}
div.stock {
	@apply mr-4;
}
div.stock img.playing-card-img {
	@apply cursor-pointer;
}
div.over {
	border: dashed red !important;
}
div.ace-cell img.playing-card-img {
	@apply cursor-pointer;
}
button {
	@apply border border-black rounded my-1 px-2 py-1;
}
button:hover {
	@apply bg-yellow-200;
}
</style>
