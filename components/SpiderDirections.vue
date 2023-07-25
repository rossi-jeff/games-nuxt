<template>
  <div id="spider-directions">
    <button
      id="spider-directions-button"
      class="directions-button"
      @click="toggle"
    >
      Directions
    </button>
    <div id="spider-directions-content" class="directions-content">
      <h3>Directions</h3>
      <div class="mb-2">
        Spider is a patience card game payed with 2 decks of cards. The name
        comes from the eight foundation piles in which complete suits are
        placed. Initially 54 cards are dealt into 10 tableau piles and the top
        card of each pile is turned face up.
      </div>
      <div class="mb-2">
        Card are moved between tableau piles until a complete suit from king to
        ace is built, and then that suit is moved to the foundation. A card can
        be placed in a tableau when the top card is one face higher than the
        card being moved. Only a series cards of the same suit can be moved
        between piles.
      </div>
      <div class="mb-2">
        The game can be difficult to solve with 4 suits, for that reason options
        are given to play with 2 or 1 suits.
      </div>
      <div class="mb-2">
        Additional info about
        <a
          href="https://en.wikipedia.org/wiki/Spider_(solitaire)"
          target="_blank"
          rel="noreferrer"
          >Spider</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toggle = () => {
  const content = document.getElementById("spider-directions-content");
  if (content) content.classList.toggle("open");
};
</script>
