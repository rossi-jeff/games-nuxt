<template>
	<div id="conentration-directions">
		<button id="conentration-directions-button" class="directions-button" @click="toggle">Directions</button>
		<div id="conentration-directions-content" class="directions-content">
			<h3>Directions</h3>
			<div class="mb-2">
				A standard deck of 52 cards is shuffled and placed face down. The player will click two cards
				to flip them over. If the cards have the same face they are removed. Other variants require
				matching both the face and the color. If the cards do not match they are turned face down
				again and the player will turn over to more cards.
			</div>
			<div class="mb-2">Play will continuue until all cards have been removed.</div>
			<div class="mb-2">
				Additional info about <a href="https://en.wikipedia.org/wiki/Concentration_(card_game)" target="_blank"
					rel="noreferrer">Concentration</a>
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
	const content = document.getElementById('conentration-directions-content')
	if (content) content.classList.toggle('open')
}
</script>