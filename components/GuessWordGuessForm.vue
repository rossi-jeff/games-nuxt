<template>
    <div class="guess-word-guess-form">
        <div class="guess-letters">
            <div v-for="(e,index) of props.length" :key="e" class="letter">
                <input 
                    type="text" 
                    v-model="state.letters[index]" 
                    class="letter-input" 
                    maxlength="1"
                    @change="checkReady" 
                />
            </div>
        </div>
        <div class="guess-button">
            <button @click="sendGuess">
                Send Guess
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps(['length'])

let letters: string[] = []
const state = reactive({ letters, ready: false })
const emit = defineEmits(['sendGuess'])

const checkReady = () => {
    if (state.letters.length != props.length) {
        state.ready = false
        return
    }
    let valid = true
    for (const letter of state.letters) {
        if (letter.length != 1 || letter == '') valid = false
    }
    state.ready = valid
}

const sendGuess = () => {
    const { letters } = state
    emit("sendGuess", { Guess: letters.join('') })
    state.letters = []
    checkReady()
}
</script>

<style lang="postcss">
div.guess-word-guess-form {
    @apply mx-2 my-1 p-2 border border-black rounded flex flex-wrap;
}
div.guess-letters {
    @apply flex flex-wrap;
}
input.letter-input {
    @apply w-8 h-8 border border-black rounded mr-4 text-center;
}
</style>