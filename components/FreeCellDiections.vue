<template>
	<div id="free-cell-directions">
		<button id="free-cell-directions-button" class="directions-button" @click="toggle">Directions</button>
		<div id="free-cell-directions-content" class="directions-content">
			<h3>Directions</h3>
			<div class="mb-2">
				A standard deck of 52 cards is shuffled and dealt face up across 8 columns known as the
				tableau. Above the tableau there are four "free" calls that can each hold one card, and four
				columns to hold ace to king of the same suit called the foundation.
			</div>
			<div class="mb-2">
				The goal of the game is to move all the cards to the foundation. A card or series of cards in
				decending order of alternating colors may be moved between tableau columns. The top card of
				the tableua column receiving the card or cards must be of opposite color and one face higher.
				An empty tableau column can hold any card and not just a king like other games. The amount of
				cards that can be moved is determined by the number of empty free cells and empty tableau
				columns. Once a card is moved to the foundation it cannot be moved back to the tableau.
			</div>
			<div class="mb-2">
				Additional info about <a href="https://en.wikipedia.org/wiki/FreeCell" target="_blank" rel="noreferrer">Free
					Cell</a>
			</div>
			<h3>Scoring</h3>
			<div class="mb-2">
				This version is designed as solitaire and the goal is to complete in the shortest time.
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const toggle = () => {
	const content = document.getElementById('free-cell-directions-content')
	if (content) content.classList.toggle('open')
}
</script>