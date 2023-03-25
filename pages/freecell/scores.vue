<template>
  <div class="free-cell-scores">
    <div v-if="state.Items && state.Items.length > 0">
      <FreeCellScoresList :items="state.Items" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FreeCell } from "../../utils/types/free-cell.type";

let Items: FreeCell[] = reactive([]);
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 });
const path = "/api/free_cell";

state = await loadScores(path, state.Offset, state.Limit)
</script>
