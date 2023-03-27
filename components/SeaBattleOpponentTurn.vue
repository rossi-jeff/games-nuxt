<template>
    <div class="sea-battle-opponent-turn">
        <h2>Opponent Turn</h2>
        <button @click="playerTurn">Player Turn</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['ships','turns','axis'])
const emit = defineEmits(['toggle'])

const playerTurn = () => emit("toggle")
</script>