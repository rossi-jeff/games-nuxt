<template>
	<main class="games-body">
		<TabBar />
		<div class="body-scroll">
			<slot />
		</div>
	</main>
</template>

<style lang="postcss">
.games-body {
	@apply m-0 p-2 bg-indigo-200 h-screen max-h-screen flex flex-col;
}

.body-scroll {
	@apply overflow-y-auto flex-grow;
}

.directions-content {
	@apply transition-all border border-black rounded my-2 bg-slate-100 p-2 hidden;
}

.directions-content.open {
	@apply block;
}

.directions-content h3 {
	@apply font-bold text-lg mb-2;
}

.directions-content .scoring-grid {
	@apply border border-slate-700 rounded p-2;
}

.scoring-grid-row,
.individual,
.multiple {
	@apply flex flex-wrap border-b border-dotted border-slate-500 justify-between px-2;
}

.individual .score {
	@apply w-48 text-right;
}

.individuals-header,
.multiples-header {
	@apply flex flex-wrap justify-between px-2 py-1 font-bold bg-indigo-400 text-black rounded my-2;
}

.scoring-grid-row .category {
	@apply w-32 text-left font-bold;
}

.scoring-grid-row .description {
	@apply flex-grow text-left w-32;
}

.scoring-grid-row .score {
	@apply w-36 text-right;
}
</style>
