<template>
  <div class="klondike-scores-list">
    <div class="klondike-header">
      <div class="k-user">User</div>
      <div class="status">Status</div>
      <div class="time">Time</div>
      <div class="moves">Moves</div>
    </div>
    <div
      class="klondike-score"
      v-for="klondike of props.items"
      :key="klondike.id"
    >
      <div class="k-user">
        {{ klondike.user ? klondike.user.UserName : "Anonymous" }}
      </div>
      <div class="status">{{ klondike.Status }}</div>
      <div class="time">{{ formatElapsedSeconds(klondike.Elapsed) }}</div>
      <div class="moves">{{ klondike.Moves }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["items"]);
</script>

<style lang="postcss">
div.klondike-scores-list {
  @apply my-2;
}
div.klondike-header {
  @apply flex flex-wrap justify-between font-bold bg-gray-200 mb-1 px-1;
}
div.klondike-score {
  @apply flex flex-wrap justify-between border border-dashed border-b-gray-500;
}
div.k-user {
  @apply w-32 text-left;
}
div.status,
div.time {
  @apply w-20 text-center;
}
div.moves {
  @apply w-20 text-right;
}
</style>
