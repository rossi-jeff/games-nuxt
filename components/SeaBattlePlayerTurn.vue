<template>
  <div class="sea-battle-player-turn">
    <h2>Player Turn</h2>
    <!-- target grid -->
    <div class="target-grid">
      <div class="top-header-row">
        <div class="header-cell"></div>
        <div class="header-cell" v-for="H of axisH" :key="`TH-${H}`">
          {{ H }}
        </div>
      </div>
      <div class="target-row" v-for="V of axisV" :key="`row-${V}`">
        <div class="header-cell">{{ V }}</div>
        <div
          class="target-cell"
          v-for="H of axisH"
          :key="`cell-${V}-${H}`"
          :id="`T-${V}-${H}`"
        >
          <span></span>
        </div>
      </div>
    </div>
    <div v-if="props.status == GameStatus.Playing">
      <!-- target controls-->
      <div v-if="props.fired == false">
        <div class="player-fire-controls">
          <div class="h-select-div">
            <label for="h-select">H</label>
            <select
              name="h-select"
              v-model="state.coordinates.Horizontal"
              @change="highLightCoordinates"
            >
              <option
                v-for="h of axisH"
                :key="h"
                :value="h"
                :selected="h == state.coordinates.Horizontal"
              >
                {{ h }}
              </option>
            </select>
          </div>
          <div class="v-select-div">
            <label for="v-select">V</label>
            <select
              name="v-select"
              v-model="state.coordinates.Vertical"
              @change="highLightCoordinates"
            >
              <option
                v-for="v of axisV"
                :key="v"
                :value="v"
                :selected="v == state.coordinates.Vertical"
              >
                {{ v }}
              </option>
            </select>
          </div>
          <div v-if="state.errors.length == 0">
            <button @click="fire">Fire</button>
          </div>
          <div v-else>
            <ul>
              <li v-for="(e, i) of state.errors" :key="i">{{ e }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else>
        <button @click="opponentTurn">Opponent Turn</button>
      </div>
    </div>
    <!-- opponent ships -->
    <div class="opponent-ship-list">
      <SeaBattleShipDisplay
        v-for="ship of props.ships"
        :key="ship.id"
        :ship="ship"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PointType } from "../utils/types/point-type.type";
import { SeaBattleTurn } from "../utils/types/sea-battle-turn.type";
import { GameStatus } from "../utils/enum/game-status.enum";

const props = defineProps(["ships", "turns", "axis", "fired", "status"]);
const emit = defineEmits(["toggle", "fire"]);
const axisH = SeaBattleMaxAxis.H.slice(0, props.axis);
const axisV = SeaBattleMaxAxis.V.slice(0, props.axis);

const opponentTurn = () => emit("toggle");

let coordinates: PointType = {
  Horizontal: axisH[0],
  Vertical: axisV[0],
};
let highlighted: PointType = {};
let occupied: PointType[] = [];
let errors: string[] = [];

const displayTurns = (turns: SeaBattleTurn[]) => {
  const occupied: PointType[] = [];
  let el;
  for (const turn of turns) {
    const { Horizontal, Vertical, Target } = turn;
    el = document.getElementById(`T-${Vertical}-${Horizontal}`);
    if (el && Target) el.classList.add(Target);
    occupied.push({ Horizontal, Vertical });
  }
  return occupied;
};

const state = reactive({ coordinates, highlighted, errors, occupied });

const highLightCoordinates = () => {
  state.errors = [];
  const { Horizontal, Vertical } = state.coordinates;
  if (
    state.occupied.find(
      (p) => p.Horizontal == Horizontal && p.Vertical == Vertical
    )
  ) {
    state.errors.push("You may not repeat fire points");
    return;
  }
  let el;
  const existing = document.getElementsByClassName("highlighted");
  if (existing.length) {
    for (let i = 0; i < existing.length; i++) {
      el = document.getElementById(existing[i].id);
      if (el) el.classList.remove("highlighted");
    }
  }
  el = document.getElementById(`T-${Vertical}-${Horizontal}`);
  if (el) el.classList.add("highlighted");
  state.highlighted.Horizontal = Horizontal;
  state.highlighted.Vertical = Vertical;
};

const fire = () => {
  const { coordinates } = state;
  let el;
  if (state.highlighted.Horizontal && state.highlighted.Vertical) {
    el = document.getElementById(
      `T-${state.highlighted.Vertical}-${state.highlighted.Horizontal}`
    );
    if (el) el.classList.remove("highlighted");
  }
  emit("fire", coordinates);
};

setTimeout(() => {
  state.occupied = displayTurns(props.turns);
}, 100);
</script>

<style lang="postcss">
div.sea-battle-player-turn {
  @apply border border-black rounded mx-2 my-1 p-2;
}
div.target-grid {
  @apply mx-2 border border-gray-500 p-0 max-w-fit mb-4;
}
div.target-row,
div.top-header-row {
  @apply flex flex-wrap;
}
div.header-cell {
  @apply w-8 h-8 p-0 m-0 bg-gray-300 font-bold text-center pt-1;
}
div.target-cell {
  @apply w-8 h-8 p-0 m-0 border border-dotted border-gray-300 text-center;
}
div.opponent-ship-list {
  @apply flex flex-wrap mx-2;
}
div.player-fire-controls {
  @apply flex flex-wrap;
}
div.player-fire-controls label {
  @apply max-w-fit mr-2 mb-2 inline-block font-bold;
}
.Miss span {
  @apply w-4 h-4 rounded-full inline-block mt-2 bg-blue-200;
}
.Hit span {
  @apply w-4 h-4 rounded-full inline-block mt-2 bg-red-200;
}
.Sunk span {
  @apply w-4 h-4 rounded-full inline-block mt-2 bg-red-400;
}
</style>
