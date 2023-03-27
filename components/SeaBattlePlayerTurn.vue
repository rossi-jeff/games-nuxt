<template>
    <div class="sea-battle-player-turn">
        <h2>Player Turn</h2>
        <button @click="opponentTurn">Opponent Turn</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['ships','turns','axis'])
const emit = defineEmits(['toggle'])

const opponentTurn = () => emit("toggle")
</script>