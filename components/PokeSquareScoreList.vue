<template>
  <div class="poker-squares-scores-list">
    <div class="poker-squares-header">
      <div class="ps-user">User</div>
      <div class="status">Status</div>
      <div class="ps-score">Score</div>
    </div>
    <div
      class="poker-squares-score"
      v-for="pokerSquare of props.items"
      :key="pokerSquare.id"
    >
      <div class="ps-user">
        {{ pokerSquare.user ? pokerSquare.user.UserName : "Anonymous" }}
      </div>
      <div class="status">{{ pokerSquare.Status }}</div>
      <div class="ps-score">{{ pokerSquare.Score }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["items"]);
</script>

<style lang="postcss">
div.poker-squares-scores-list {
  @apply my-2;
}
div.poker-squares-header {
  @apply flex flex-wrap justify-between font-bold bg-gray-200 mb-1 px-1;
}
div.poker-squares-score {
  @apply flex flex-wrap justify-between border border-dashed border-b-gray-500;
}
div.ps-user {
  @apply w-32 text-left;
}
div.status {
  @apply w-20 text-center;
}
div.ps-score {
  @apply w-20 text-right;
}
</style>
