<template>
	<div id="yacht-directions">
		<button id="yacht-directions-button" class="directions-button" @click="toggle">Directions</button>
		<div id="yacht-directions-content" class="directions-content">
			<h3>Directions</h3>
			<div class="mb-2">
				<div class="mb-2">
					Yacht is public domain a dice game played with five dice over a series of twelve turns. This
					version is structured as a solitaire game.
				</div>
				<div>
					A game consists of 12 rounds, one for each scoring category. In each turn the player will
					have a maximum of three dice rolls. After each roll the player may choose to keep some of
					the dice to be included in the next roll. At the end of the 3rd roll or after any roll the
					player may choose to assign the category to the roll and receive the resulting score.
				</div>
				<div class="mt-2">
					<a href="https://en.wikipedia.org/wiki/Yacht_(dice_game)" target="_blank" rel="noreferrer">Additional info from
						Wikipedia</a>
				</div>
			</div>
			<h3>Scoring</h3>
			<div class="scoring-grid">
				<div class="scoring-grid-row">
					<div class="category">Ones</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 1 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Twos</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 2 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Threes</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 3 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Fours</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 4 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Fives</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 5 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Sixes</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 6 faces</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Full House</div>
					<div class="description">Threee of one face and two of another</div>
					<div class="score">25</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Four of a Kind</div>
					<div class="description">Four of one face</div>
					<div class="score">Sum of four dice</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Little Straight</div>
					<div class="description">1-2-3-4-5</div>
					<div class="score">30</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Big Straight</div>
					<div class="description">2-3-4-5-6</div>
					<div class="score">30</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Choice</div>
					<div class="description">Any combination</div>
					<div class="score">Sum of all 5 dice</div>
				</div>

				<div class="scoring-grid-row">
					<div class="category">Yacht</div>
					<div class="description">Five of one face</div>
					<div class="score">50</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const toggle = () => {
	const content = document.getElementById('yacht-directions-content')
	if (content) content.classList.toggle('open')
}
</script>