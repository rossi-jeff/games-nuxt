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
</style>
