<template>
	<div id="ten-grand-directions">
		<button id="ten-grand-directions-button" class="directions-button" @click="toggle">Directions</button>
		<div id="ten-grand-directions-content" class="directions-content">
			<h3>Directions</h3>
			<div class="mb-2">
				Ten Grand is a dice game where the goal is to score more than 10000 points. In each turn the
				player will roll 6 dice and attempt to receive some score for all of them. In fact if you do
				not score all 6 dice you crap out for the turn and receive a score of zero.
			</div>
			<div class="mb-2">
				The scoring options include 3, 4, 5, or 6 of a kind, a straight of all 6 dices, three pairs,
				double 3 of a kind, and a full house. Both 1s and 5s are the only dice that can be scored
				individually. Some discrepacies were found in the scoring of larger items, the points used in
				this version are listed in the table below. Some versions allow progressively building larger
				items across multiple rolls, but that is not the case here. This version is designed as
				solitaire and the goal is to achieve 10000 points in the fewest amount of turns.
			</div>
			<div class="mb-2">
				Additional info about <a href="https://en.wikipedia.org/wiki/Dice_10000" target="_blank" rel="noreferrer">Ten
					Grand</a>
			</div>
			<h3>Scoring</h3>
			<div class="scoring-grid">
				<div class="individuals-header">
					<div class="roll">Dice Roll</div>
					<div class="score">Points</div>
				</div>
				<div class="individual">
					<div class="roll">Single 5</div>
					<div class="score">50</div>
				</div>
				<div class="individual">
					<div class="roll">Single 1</div>
					<div class="score">100</div>
				</div>
				<div class="individual">
					<div class="roll">Three Pairs</div>
					<div class="score">1500</div>
				</div>
				<div class="individual">
					<div class="roll">Straight 1-2-3-4-5-6</div>
					<div class="score">2000</div>
				</div>
				<div class="individual">
					<div class="roll">Full House</div>
					<div class="score">1500</div>
				</div>
				<div class="individual">
					<div class="roll">Double 3 of a Kind</div>
					<div class="score">Double sum of scores</div>
				</div>

				<div class="multiples-header">
					<div class="face">Face</div>
					<div class="kind-3">3 of a Kind</div>
					<div class="kind-4">4 of a Kind</div>
					<div class="kind-5">5 of a Kind</div>
					<div class="kind-6">6 of a Kind</div>
				</div>
				<div class="multiple" v-for="(m, i) of  multiples" :key="i">
					<div class="face">{{ m[0] }}</div>
					<div class="kind-3">{{ m[1] }}</div>
					<div class="kind-4">{{ m[2] }}</div>
					<div class="kind-5">{{ m[3] }}</div>
					<div class="kind-6">{{ m[4] }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const toggle = () => {
	const content = document.getElementById('ten-grand-directions-content')
	if (content) content.classList.toggle('open')
}

const multiples: number[][] = [
	[1, 1000, 2000, 4000, 8000],
	[2, 200, 400, 800, 1600],
	[3, 300, 600, 1200, 2400],
	[4, 400, 800, 1600, 3200],
	[5, 500, 1000, 2000, 4000],
	[6, 600, 1200, 2400, 4800]
];
</script>