<template>
    <div class="concentration-game">
        <div class="concentration-cards" v-if="state.status == GameStatus.Playing">
            <div class="card-wrapper" v-for="(card,index) of state.deck.cards" :key="card.id">
                <PlayingCard 
                    :card="card" 
                    :level="0" 
                    :index="index"
                    from="concentration"
                    @click="cardClicked" 
                />
            </div>
        </div>
        <div v-else>
            <button @click="deal">Deal</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GameStatus } from '~~/utils/enum/game-status.enum';

let deck = new Deck()
let status: GameStatus | undefined
let first: string = ''
let second: string = ''
let hidden: string[] = []
const state = reactive({ deck, status, first, second, hidden })

const deal = () => {
    if (state.hidden.length) {
        for (const id of state.hidden) showCard(id)
    }
    state.hidden = []
    state.deck.shuffle()
    state.deck.cards.map(c => {
        c.facedown = true
        c.draggable = false
        c.clickable = true
    })
    state.status = GameStatus.Playing
    
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

const flipCard = (id: string , facedown: boolean) => {
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
}

const getCard = (id: string) => {
    let idx = id.split('_').pop()
    return idx ? state.deck.cards[parseInt(idx)] : null
}

onMounted(() => deck.preload())
</script>

<style lang="postcss">
div.concentration-cards {
    @apply flex flex-wrap p-2;
}
div.card-wrapper {
    @apply w-28 h-36 relative;
}
div.card-wrapper img {
    @apply cursor-pointer;
}
</style>