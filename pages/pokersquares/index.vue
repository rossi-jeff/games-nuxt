<template>
	<div class="poker-squares-game">
		<Head>
			<Title>Poker Squares</Title>
		</Head>
		<div class="flex flex-wrap justify-between">
			<h1>Poker Squares</h1>
			<div class="scores-link">
				<NuxtLink to="/pokersquares/scores">See Top Scores</NuxtLink>
			</div>
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<button @click="deal" v-if="state.pokerSquare.Status != 'Playing'">
					Deal
				</button>
			</div>
			<div>
				<strong class="mr-2">Total</strong>
				{{ state.scores.total }}
			</div>
		</div>
		<div class="flex flex-wrap">
			<div class="mr-16">
				<!-- left column-->
				<div class="column-label">&nbsp;</div>
				<div id="stock" class="card-container">
					<PlayingCard
						v-for="card of state.stock"
						:key="card.id"
						:card="card"
						:level="0"
						from="stock"
						@click="stockClicked"
					/>
				</div>
				<div id="waste" class="card-container">
					<PlayingCard
						v-if="state.current != undefined"
						:key="state.current.id"
						:card="state.current"
						:level="0"
						from="waste"
						@drag-start="dragStart"
					/>
				</div>
				<div>
					<div class="mb-2">
						<label for="Row">Row</label>
						<select name="Row" v-model="state.Row">
							<option v-for="row of rows" :key="row" :value="row">
								{{ row }}
							</option>
						</select>
					</div>
					<div class="mb-2">
						<label for="Column">Column</label>
						<select name="Column" v-model="state.Column">
							<option v-for="column of columns" :key="column" :value="column">
								{{ column + 1 }}
							</option>
						</select>
					</div>
					<div>
						<button @click="placeCard">Place Card</button>
					</div>
				</div>
			</div>
			<div>
				<!-- right column -->
				<div class="flex flex-wrap">
					<div class="w-6 h-6">&nbsp;</div>
					<div class="column-label" v-for="column of columns" :key="column">
						{{ column + 1 }}
					</div>
				</div>
				<div class="grid-row" v-for="row of rows" :key="row">
					<div class="row-label">{{ row }}</div>
					<div
						class="card-container"
						v-for="column of columns"
						:key="`${row}_${column}`"
						:id="`${row}_${column}`"
						@dragover="dragOver"
						@dragenter="dragEnter"
						@drop="drop"
					>
						<PlayingCard
							v-if="state.grid[row][column]"
							:key="state.grid[row][column].id"
							:card="state.grid[row][column]"
							:level="0"
							from="grid"
						/>
					</div>
					<div class="row-label">{{ state.scores.row[row] }}</div>
				</div>
				<div class="flex flex-wrap">
					<div class="w-6 h-6">&nbsp;</div>
					<div class="column-label" v-for="column of columns" :key="column">
						{{ state.scores.column[column] }}
					</div>
				</div>
			</div>
		</div>
		<PokerSquaresDirections v-if="state.pokerSquare.Status != 'Playing'" />
	</div>
</template>

<script lang="ts" setup>
import { PokerSquare } from '~~/utils/types/poker-square.type'
import { storeToRefs } from 'pinia'
import { GameStatus } from '~~/utils/enum/game-status.enum'
import { Card } from '~~/utils/card.class'
import { Deck } from '~~/utils/deck.class'

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)
const rows = ['A', 'B', 'C', 'D', 'E']
const columns = [0, 1, 2, 3, 4]

let deck = new Deck()
let pokerSquare: PokerSquare = {}
let grid: { [key: string]: { [key: number]: Card } } = {
	A: {},
	B: {},
	C: {},
	D: {},
	E: {},
}
const scores: {
	row: { [key: string]: number }
	column: number[]
	total: number
} = {
	row: {
		A: 0,
		B: 0,
		C: 0,
		D: 0,
		E: 0,
	},
	column: [0, 0, 0, 0, 0],
	total: 0,
}
let stock: Card[] = []
let current: Card | undefined

const state = reactive({
	deck,
	session,
	pokerSquare,
	grid,
	scores,
	stock,
	current,
	Row: 'A',
	Column: 0,
})

const deal = () => {
	state.deck = new Deck()
	state.deck.shuffle()
	state.stock = []
	for (const row of rows) {
		state.grid[row] = {}
		state.scores.row[row] = 0
	}
	for (const column of columns) state.scores.column[column] = 0
	state.scores.total = 0
	while (state.stock.length < 25) {
		const card = state.deck.draw()
		if (card) {
			card.clickable = true
			card.facedown = true
			card.draggable = false
			state.stock.push(card)
		}
	}
	createGame()
}

const createGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/poker_square`, {
			method: 'POST',
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.pokerSquare = await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}

const updateGame = async (
	Score: number,
	Status: GameStatus = GameStatus.Won
) => {
	if (!state.pokerSquare.id) return
	const result = await fetch(
		`${apiUrl}/api/poker_square/${state.pokerSquare.id}`,
		{
			method: 'PATCH',
			body: JSON.stringify({ Score, Status }),
			headers: buildRequestHeaders(state.session),
		}
	)
	if (result.ok) {
		state.pokerSquare = await result.json()
	}
}

const stockClicked = (event: any) => {
	const { id } = event
	if (!id) return
	let [from, _, cardId] = id.split('_')
	if (from != 'stock') return
	if (state.current) return
	const card = state.stock.pop()
	if (card) {
		if (card.id == parseInt(cardId)) {
			card.clickable = false
			card.draggable = true
			card.facedown = false
			state.current = card
		} else state.stock.push(card)
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
		while (!target.classList.contains('card-container'))
			target = target.parentElement
		target.classList.add('over')
		setTimeout(() => {
			target.classList.remove('over')
		}, 750)
	}
}

const drop = (event: any) => {
	event.preventDefault()
	event.stopPropagation()
	let to: string = ''
	let { target } = event
	if (target) {
		while (!target.classList.contains('card-container'))
			target = target.parentElement
		to = target.id
	}
	const [row, column] = to.split('_')
	if (!state.current) return
	if (state.grid[row][parseInt(column)]) return
	const card = state.current
	if (card) {
		card.draggable = false
		state.grid[row][parseInt(column)] = card
		state.current = undefined
		updateScores()
	}
}

const placeCard = () => {
	if (!state.current) return
	const { Row, Column } = state
	if (state.grid[Row][Column]) return
	const card = state.current
	if (card) {
		card.draggable = false
		state.grid[Row][Column] = card
		state.current = undefined
		updateScores()
	}
}

const updateScores = () => {
	let hand: Card[] = []
	let total = 0
	let card: Card | undefined
	// row scores
	for (const row of rows) {
		hand = []
		for (const column of columns) {
			card = grid[row][column]
			if (card) hand.push(card)
		}
		state.scores.row[row] = hand.length == 5 ? scoreHand(hand) : 0
		total += state.scores.row[row]
	}
	// column scores
	for (const column of columns) {
		hand = []
		for (const row of rows) {
			card = grid[row][column]
			if (card) hand.push(card)
		}
		state.scores.column[column] = hand.length == 5 ? scoreHand(hand) : 0
		total += state.scores.column[column]
	}
	state.scores.total = total
	if (stock.length == 0) {
		updateGame(total)
	}
}

const scoreHand = (hand: Card[]) => {
	const results = checkHand(hand)
	if (results.isRoyal) return 100
	if (results.isStraightFlush) return 75
	if (results.isFourKind) return 50
	if (results.isFullHouse) return 25
	if (results.isFlush) return 20
	if (results.isStraight) return 15
	if (results.isThreeKind) return 10
	if (results.isTwoPair) return 5
	if (results.isPair) return 2
	return 0
}

const checkHand = (hand: Card[]) => {
	let data: {
		faces: string[]
		suits: { [key: string]: number }
		counts: { [key: string]: number }
		order: number[]
	} = {
		faces: [],
		suits: {},
		counts: {},
		order: [],
	}
	for (const card of hand) {
		data.faces.push(card.face)
		if (!data.suits[card.suit]) data.suits[card.suit] = 0
		if (!data.counts[card.face]) data.counts[card.face] = 0
		data.suits[card.suit]++
		data.counts[card.face]++
		data.order.push(deck.faces.indexOf(card.face))
	}
	let results: { [key: string]: boolean } = {}
	results.isFlush = Object.values(data.suits).includes(5)
	results.isThreeKind = Object.values(data.counts).includes(3)
	results.isFourKind = Object.values(data.counts).includes(4)
	results.isPair = Object.values(data.counts).includes(2)
	results.isFullHouse = results.isThreeKind && results.isPair
	results.isTwoPair = isTwoPair(Object.values(data.counts))
	results.isStraight = isStraight(data.order)
	results.isStraightFlush = results.isFlush && results.isStraight
	results.isRoyal = results.isStraightFlush && data.faces.includes('king')
	return results
}

const isStraight = (order: number[]) => {
	const sorted = order.sort((a, b) => a - b)
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i - 1] + 1 != sorted[i]) return false
	}
	return true
}

const isTwoPair = (values: number[]) => {
	const idx = values.indexOf(2)
	if (idx == -1) return false
	return idx != values.lastIndexOf(2)
}
</script>

<style lang="postcss">
div.poker-squares-game {
	@apply mx-2 my-2;
}
div.card-container {
	@apply w-28 h-36 p-0 border border-dashed border-indigo-900 bg-indigo-300 rounded text-center relative mr-4 mb-4;
}
div.grid-row {
	@apply flex flex-wrap;
}
div.row-label {
	@apply w-6 h-36 font-bold pt-16;
}
div.column-label {
	@apply h-6 w-28 font-bold text-center mr-4;
}
label {
	@apply font-bold inline-block w-20;
}
div.over {
	border: dashed red !important;
}
div.poker-squares-game button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}
div.poker-squares-game button:hover {
	@apply bg-slate-600 text-white;
}
div.scores-link a {
	@apply font-bold text-indigo-600;
}

div.scores-link a:hover {
	@apply underline text-indigo-900;
}
</style>
