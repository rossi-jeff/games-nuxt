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

const loadScores = async () => {
  const { Offset, Limit } = state;
  const path = "/api/free_cell";
  const params: { [key: string]: number } = { Offset, Limit };
  const url = new URL(path, apiUrl);
  for (const key in params) {
    url.searchParams.append(key, params[key].toString());
  }
  try {
    const result = await fetch(url);
    if (result.ok) {
      state = await result.json();
    }
  } catch (error) {
    console.log(error);
  }
};

await loadScores();
</script>
