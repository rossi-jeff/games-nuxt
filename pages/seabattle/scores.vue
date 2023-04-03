<template>
  <div class="sea-battle-scores">
    <div v-if="state.Items && state.Items.length > 0">
      <SeaBattleScoresList
        :items="state.Items"
        label="View"
        @follow-link="followLink"
      />
    </div>
    <PaginationControls
      :count="state.Count"
      :offset="state.Offset"
      :limit="state.Limit"
      @limit-changed="limitChanged"
      @page-changed="pageChanged"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { SeaBattle } from "../../utils/types/sea-battle.type";
import { loadScores } from "../../utils/load-scores";

let Items: SeaBattle[] = reactive([]);
let state = reactive({ Items, Count: 0, Limit: 10, Offset: 0 });
const path = "/api/sea_battle";
const router = useRouter();

const limitChanged = async (event: any) => {
  const { limit } = event;
  state.Offset = 0;
  state.Limit = limit;
  const { Items, Count, Offset, Limit } = await loadScores(
    path,
    state.Offset,
    state.Limit
  );
  state.Items = Items;
  state.Count = Count;
  state.Offset = Offset;
  state.Limit = Limit;
};

const pageChanged = async (event: any) => {
  const { current } = event;
  state.Offset = (current - 1) * state.Limit;
  const { Items, Count, Offset, Limit } = await loadScores(
    path,
    state.Offset,
    state.Limit
  );
  state.Items = Items;
  state.Count = Count;
  state.Offset = Offset;
  state.Limit = Limit;
};

const initialLoad = async () => {
  const { Items, Count, Offset, Limit } = await loadScores(
    path,
    state.Offset,
    state.Limit
  );
  state.Items = Items;
  state.Count = Count;
  state.Offset = Offset;
  state.Limit = Limit;
};

const followLink = (event: any) => {
  const { id } = event;
  router.push(`/seabattle/${id}`);
};

onMounted(() => initialLoad());
</script>
