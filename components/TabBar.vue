<template>
	<div class="tab-bar">
		<div class="user-link-row">
			<NuxtLink
				v-for="(link, index) of userLinks"
				:key="`L-${index}`"
				:to="link.to"
				>{{ link.text }}</NuxtLink
			>
		</div>
		<h1>Games by Jeff Rossi</h1>
		<div class="tab-row">
			<NuxtLink v-for="(tab, index) of tabs" :key="`T-${index}`" :to="tab.to">{{
				tab.text
			}}</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
type TabType = {
	to: string
	text: string
}
const tabs: TabType[] = [
	{ to: '/', text: 'Home' },
	{ to: '/yacht', text: 'Yacht' },
	{ to: '/freecell', text: 'Free Cell' },
	{ to: '/klondike', text: 'Klondike' },
	{ to: '/codebreaker', text: 'Code Breaker' },
	{ to: '/seabattle', text: 'Sea Battle' },
	{ to: '/hangman', text: 'Hang Man' },
	{ to: '/tengrand', text: 'Ten Grand' },
	{ to: '/concentration', text: 'Concentration' },
]
const userLinks: TabType[] = [
	{ to: '/login', text: 'Sign In' },
	{ to: '/register', text: 'Register' },
]
</script>

<style lang="postcss">
div.tab-bar {
	@apply border border-black rounded mx-2 pl-2 pr-2 pt-2 pb-0 my-2 bg-slate-100;
}
div.tab-bar h1 {
	@apply text-2xl font-bold text-indigo-900;
}
div.user-link-row {
	@apply flex flex-wrap justify-end;
}
div.tab-row {
	@apply flex flex-wrap;
}
div.tab-row a {
	@apply border-l border-t border-r rounded border-black px-2 py-1 mr-1 mb-0 inline-block shadow-lg bg-white;
}
div.tab-row a:hover {
	@apply bg-slate-400 underline;
}
div.tab-row a.router-link-active {
	@apply bg-slate-700 text-white;
}
div.user-link-row a {
	@apply ml-4;
}
div.user-link-row a:hover {
	@apply font-bold underline;
}
div.user-link-row a.router-link-active {
	@apply bg-slate-700 text-white px-2 rounded;
}
</style>
