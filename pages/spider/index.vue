<template>
	<div class="spider-game">
		<Head>
			<Title>Spider</Title>
		</Head>
		<div class="flex flex-wrap justify-between pl-2">
			<h1>Spider</h1>
			<div class="scores-link">
				<NuxtLink to="/spider/scores">See Top Scores</NuxtLink>
			</div>
		</div>
		<div class="header-row">
			<div class="buttons">
				<div v-if="state.spider.Status != 'Playing'">
					<label for="suits">Suits</label>
					<select name="suits" v-model="state.suits">
						<option v-for="sc of suitCounts" :key="sc" :value="sc">
							{{ sc }}
						</option>
					</select>
					<button @click="deal">Deal</button>
				</div>
				<div v-if="state.spider.Status == 'Playing'">
					<button @click="quit">Quit</button>
				</div>
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
				<div id="stock" class="stock">
					<PlayingCard
						v-for="card of state.stock.columns[0].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="stock"
						@click="stockCardClicked"
					/>
				</div>
			</div>
			<div class="top-row-right">
				<div id="ace-cell-0" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[0].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-0"
					/>
				</div>
				<div id="ace-cell-1" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[1].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-1"
					/>
				</div>
				<div id="ace-cell-2" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[2].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-2"
					/>
				</div>
				<div id="ace-cell-3" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[3].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-3"
					/>
				</div>
				<div id="ace-cell-4" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[4].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-4"
					/>
				</div>
				<div id="ace-cell-5" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[5].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-5"
					/>
				</div>
				<div id="ace-cell-6" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[6].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-6"
					/>
				</div>
				<div id="ace-cell-7" class="ace-cell">
					<PlayingCard
						v-for="card of state.aces.columns[7].cards"
						:key="card.id"
						:card="card"
						:level="0"
						from="ace-cell-7"
					/>
				</div>
			</div>
		</div>
		<div class="bottom-row">
			<div
				id="tableau-0"
				class="tableau"
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
				id="tableau-1"
				class="tableau"
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
				id="tableau-2"
				class="tableau"
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
				id="tableau-3"
				class="tableau"
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
				id="tableau-4"
				class="tableau"
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
				id="tableau-5"
				class="tableau"
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
				id="tableau-6"
				class="tableau"
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
			<div
				id="tableau-7"
				class="tableau"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[7].cards"
					:key="card.id"
					:card="card"
					:level="level"
					from="tableau-7"
					@drag-start="dragStart"
				/>
			</div>
			<div
				id="tableau-8"
				class="tableau"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[8].cards"
					:key="card.id"
					:card="card"
					:level="level"
					from="tableau-8"
					@drag-start="dragStart"
				/>
			</div>
			<div
				id="tableau-9"
				class="tableau"
				@dragover="dragOver"
				@dragenter="dragEnter"
				@drop="drop"
			>
				<PlayingCard
					v-for="(card, level) of state.tableau.columns[9].cards"
					:key="card.id"
					:card="card"
					:level="level"
					from="tableau-9"
					@drag-start="dragStart"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Card } from '~~/utils/card.class'
import { GameStatus } from '../../utils/enum/game-status.enum'
import { Spider } from '../../utils/types/spider.type'

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

let deck = new Deck()
const tableau = new CardHolder(10)
const aces = new CardHolder(8)
const stock = new CardHolder(1)
let timeout: ReturnType<typeof setTimeout> | undefined
let interval: ReturnType<typeof setInterval> | undefined
let start: number
const suitCounts: number[] = [4, 2, 1]
const decks = 2
let spider: Spider = {}

const state = reactive({
	deck,
	tableau,
	aces,
	stock,
	suits: 4,
	moves: 0,
	elapsed: 0,
	session,
	spider,
})

const deal = () => {
	const { suits } = state
	state.deck = new Deck({ decks, suits })
	state.deck.shuffle()
	start = Date.now()
	state.moves = 0
	state.elapsed = 0
	removeCards()
	let counter = 0
	let index = 0
	while (counter < 54) {
		const card = state.deck.draw()
		if (card) {
			state.tableau.columns[index].cards.push(card)
		} else break
		counter++
		index++
		if (index >= 10) index = 0
	}
	while (state.deck.cards.length) {
		const card = state.deck.draw()
		if (card) {
			card.clickable = true
			state.stock.columns[0].cards.push(card)
		}
	}
	createGame(suits)
	adjustDraggable()
}

const createGame = async (Suits: number) => {
	try {
		const result = await fetch(`${apiUrl}/api/spider`, {
			method: 'POST',
			body: JSON.stringify({ Suits }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.spider = await result.json()
			console.log(state.spider)
			clock()
		}
	} catch (error) {
		console.log(error)
	}
}

const quit = () => {
	if (interval) clearInterval(interval)
	removeCards()
	updateGame(GameStatus.Lost)
}

const updateGame = async (Status: GameStatus) => {
	if (!state.spider.id) return
	const { moves: Moves, elapsed: Elapsed } = state
	try {
		const result = await fetch(`${apiUrl}/api/spider/${state.spider.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ Moves, Elapsed, Status }),
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.spider = await result.json()
			console.log(state.spider)
		}
	} catch (error) {
		console.log(error)
	}
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
	state.tableau.clear()
	state.aces.clear()
	state.stock.clear()
}

const clock = () => {
	state.elapsed = 0
	interval = setInterval(() => {
		state.elapsed = Math.round((Date.now() - start) / 1000)
	}, 1000)
}

const adjustDraggable = () => {
	let previous: Card | undefined, current: Card | undefined, length: number
	const { deck } = state
	for (let t = 0; t < 10; t++) {
		length = state.tableau.columns[t].cards.length
		if (length) {
			for (const card of state.tableau.columns[t].cards) card.draggable = false
			previous = state.tableau.columns[t].cards[length - 1]
			previous.facedown = false
			previous.draggable = true
			if (length > 1) {
				for (let i = length - 2; i >= 0; i--) {
					current = state.tableau.columns[t].cards[i]
					if (current.facedown) break
					if (current.suit != previous.suit) break
					if (
						deck.faces.indexOf(current.face) !=
						deck.faces.indexOf(previous.face) + 1
					)
						break
					current.draggable = true
					previous = current
				}
			}
		}
	}
	if (countAces() == 104) {
		if (interval) clearInterval(interval)
		updateGame(GameStatus.Won)
	}
}

const countAces = () => {
	let count = 0
	for (let a = 0; a < 8; a++) count += state.aces.columns[a].cards.length
	return count
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
	if (canDrop(from, cardId, to)) moveCards(from, cardId, to)
}

const stockCardClicked = () => {
	console.log('stockCardClicked')
	for (let t = 0; t < 10; t++) {
		const card = state.stock.columns[0].cards.pop()
		if (card) {
			state.tableau.columns[t].cards.push(card)
		} else break
	}
	state.moves++
	adjustDraggable()
}

const moveCompleteSuits = () => {
	let previous: Card | undefined,
		current: Card | undefined,
		length: number,
		counter: number
	const { deck } = state
	let toMove: Card[] = []
	for (let t = 0; t < 10; t++) {
		length = state.tableau.columns[t].cards.length
		if (length >= 13) {
			counter = 1
			previous = state.tableau.columns[t].cards[length - 1]
			for (let i = length - 2; i >= 0; i--) {
				current = state.tableau.columns[t].cards[i]
				if (current.suit != previous.suit) break
				if (
					deck.faces.indexOf(current.face) !=
					deck.faces.indexOf(previous.face) + 1
				)
					break
				counter++
				previous = current
			}
			if (counter >= 13) {
				toMove = []
				while (toMove.length < 13) {
					const card = state.tableau.columns[t].cards.pop()
					if (card) toMove.push(card)
				}
				for (let a = 0; a < 8; a++) {
					if (!state.aces.columns[a].cards.length) {
						while (toMove.length) {
							const card = toMove.pop()
							if (card) state.aces.columns[a].cards.push(card)
						}
						break
					}
				}
			}
		}
	}
	adjustDraggable()
}

const moveCards = (from: string, cardId: number, to: string) => {
	const idxF = parseInt(from.split('-').pop() || '')
	const idxT = parseInt(to.split('-').pop() || '')
	const toMove: Card[] = []
	let found = false
	while (!found) {
		const card = state.tableau.columns[idxF].cards.pop()
		if (card) {
			toMove.push(card)
			if (card.id == cardId) found = true
		}
	}
	while (toMove.length) {
		const card = toMove.pop()
		if (card) state.tableau.columns[idxT].cards.push(card)
	}
	state.moves++
	moveCompleteSuits()
}

const canDrop = (from: string, cardId: number, to: string) => {
	const topCard = getTopCard(to)
	if (!topCard) return true
	const { deck } = state
	const draggedCard = getDraggedCard(from, cardId)
	if (
		draggedCard &&
		deck.faces.indexOf(topCard.face) == deck.faces.indexOf(draggedCard.face) + 1
	)
		return true
	return false
}

const getTopCard = (to: string) => {
	let card: Card | undefined
	const idx = parseInt(to.split('-').pop() || '')
	if (state.tableau.columns[idx].cards.length) {
		card =
			state.tableau.columns[idx].cards[
				state.tableau.columns[idx].cards.length - 1
			]
	}
	return card
}

const getDraggedCard = (from: string, cardId: number) => {
	let card: Card | undefined
	const idx = parseInt(from.split('-').pop() || '')
	if (state.tableau.columns[idx].cards.length) {
		card = state.tableau.columns[idx].cards.find((c) => c.id == cardId)
	}
	return card
}

onMounted(() => state.deck.preload())
</script>

<style lang="postcss">
div.spider-game {
	@apply my-2;
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

div.ace-cell,
div.tableau,
div.stock {
	@apply w-28 h-36 p-0 border border-dashed border-indigo-900 bg-indigo-300 rounded text-center relative;
}
select {
	@apply px-2 py-1 border border-black rounded mr-2;
}

div.spider-game button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}

div.spider-game button:hover {
	@apply bg-slate-600 text-white;
}

div.spider-game div.scores-link {
	@apply mx-2;
}

div.scores-link a {
	@apply font-bold text-indigo-600;
}

div.scores-link a:hover {
	@apply underline text-indigo-900;
}
</style>
