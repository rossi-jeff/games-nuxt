<template>
  <div class="free-cell-scores-list">
    <div class="free-cell-score" v-for="free_cell of props.items" :key="free_cell.id">
      <div class="link">{{ free_cell.id }}</div>
      <div class="status">{{ free_cell.Status }}</div>
      <div class="time">{{ formatElapsedSeconds(free_cell.Elapsed) }}</div>
      <div class="moves">{{ free_cell.Moves }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["items"]);
</script>

<style lang="postcss">
div.free-cell-score {
  @apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
