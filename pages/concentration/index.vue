<template>
	<div class="concentration-game">
		<div class="concentraton-header">
			<div>
				<button @click="deal" v-if="state.status != GameStatus.Playing">
					Deal
				</button>
				<button @click="peek" v-if="state.status == GameStatus.Playing">
					Peek
				</button>
				<button @click="quit" v-if="state.status == GameStatus.Playing">
					Quit
				</button>
			</div>
			<div>
				<strong>Status</strong>
				{{ state.status }}
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
		<div class="concentration-cards" v-if="state.status == GameStatus.Playing">
			<div
				class="card-wrapper"
				v-for="(card, index) of state.deck.cards"
				:key="card.id"
			>
				<PlayingCard
					:card="card"
					:level="0"
					:index="index"
					from="concentration"
					@click="cardClicked"
				/>
			</div>
		</div>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/concentration/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { GameStatus } from '~~/utils/enum/game-status.enum'
import { Concentration } from '../../utils/types/concentration.type'

let deck = new Deck()
let status: GameStatus | undefined
let first: string = ''
let second: string = ''
let hidden: string[] = []
let interval: ReturnType<typeof setInterval> | undefined
let start: number
let concentration: Concentration = {}

const sessionStore = useSessionStore()
const { session } = storeToRefs(sessionStore)

const state = reactive({
	deck,
	status,
	first,
	second,
	hidden,
	moves: 0,
	elapsed: 0,
	concentration,
	session,
})

const deal = () => {
	if (state.hidden.length) {
		for (const id of state.hidden) showCard(id)
	}
	state.hidden = []
	state.deck = new Deck()
	state.deck.shuffle()
	state.deck.cards.map((c) => {
		c.facedown = true
		c.draggable = false
		c.clickable = true
	})
	state.status = GameStatus.Playing
	start = Date.now()
	state.moves = 0
	state.elapsed = 0
	newGame()
}

const newGame = async () => {
	try {
		const result = await fetch(`${apiUrl}/api/concentration`, {
			method: 'POST',
			headers: buildRequestHeaders(state.session),
		})
		if (result.ok) {
			state.concentration = await result.json()
			state.status = state.concentration.Status
			clock()
		}
	} catch (error) {
		console.log(error)
	}
}

const updateGame = async () => {
	const {
		concentration,
		elapsed: Elapsed,
		moves: Moves,
		status: Status,
	} = state
	if (!concentration.id) return
	try {
		const result = await fetch(
			`${apiUrl}/api/concentration/${concentration.id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({ Elapsed, Moves, Status }),
				headers: buildRequestHeaders(state.session),
			}
		)
		if (result.ok) {
			state.concentration = await result.json()
			state.status = state.concentration.Status
		}
	} catch (error) {
		console.log(error)
	}
}

const quit = () => {
	if (interval) clearInterval(interval)
	state.status = GameStatus.Lost
	updateGame()
}

const peek = () => {
	flipAll(false)
	setTimeout(() => flipAll(true), 3000)
}

const flipAll = (facedown: boolean) => {
	for (let i = 0; i < state.deck.cards.length; i++) {
		state.deck.cards[i].facedown = facedown
	}
}

const clock = () => {
	if (interval) clearInterval(interval)
	state.elapsed = 0
	interval = setInterval(() => {
		state.elapsed = Math.round((Date.now() - start) / 1000)
	}, 1000)
}

const cardClicked = (event: any) => {
	const { id } = event
	if (state.first && state.second) return
	if (state.first) {
		state.second = id
		flipCard(state.second, false)
		setTimeout(() => handleCards(), 2000)
	} else {
		state.first = id
		flipCard(state.first, false)
	}
}

const hideCard = (id: string) => {
	const wrapper = document.getElementById(id)
	if (wrapper) {
		const images = wrapper.getElementsByTagName('img')
		for (let i = 0; i < images.length; i++) {
			images[i].style.visibility = 'hidden'
		}
	}
	state.hidden.push(id)
}

const showCard = (id: string) => {
	const wrapper = document.getElementById(id)
	if (wrapper) {
		const images = wrapper.getElementsByTagName('img')
		for (let i = 0; i < images.length; i++) {
			images[i].style.visibility = 'visible'
		}
	}
}

const flipCard = (id: string, facedown: boolean) => {
	let idx = id.split('_').pop()
	if (idx) {
		state.deck.cards[parseInt(idx)].facedown = facedown
	}
}

const handleCards = () => {
	const card1 = getCard(state.first)
	const card2 = getCard(state.second)
	if (card1 && card2 && card1.face == card2.face) {
		hideCard(state.first)
		hideCard(state.second)
	} else {
		flipCard(state.first, true)
		flipCard(state.second, true)
	}
	state.first = ''
	state.second = ''
	state.moves++
	if (state.hidden.length == 52) {
		if (interval) clearInterval(interval)
		state.status = GameStatus.Won
		updateGame()
	}
}

const getCard = (id: string) => {
	let idx = id.split('_').pop()
	return idx ? state.deck.cards[parseInt(idx)] : null
}

onMounted(() => deck.preload())
</script>

<style lang="postcss">
div.concentration-game {
	@apply mx-2 my-2;
}
div.concentraton-header {
	@apply flex flex-wrap justify-between;
}
div.concentraton-header button {
	@apply border border-black rounded px-2 py-1 bg-slate-200 mr-2;
}
div.concentraton-header button:hover {
	@apply bg-slate-600 text-white;
}
div.concentration-cards {
	@apply flex flex-wrap my-2 h-fit;
}
div.card-wrapper {
	@apply w-28 h-36 relative;
}
div.card-wrapper img {
	@apply cursor-pointer;
}
</style>
