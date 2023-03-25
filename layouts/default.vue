<template>
	<div>
		<div>
			<NuxtLink to="/">Home</NuxtLink>
			<NuxtLink to="/yacht">Yacht</NuxtLink>
			<NuxtLink to="/freecell">Free Cell</NuxtLink>
			<NuxtLink to="/klondike">Klondike</NuxtLink>
			<NuxtLink to="/codebreaker">Code Breaker</NuxtLink>
		</div>
		<slot />
	</div>
</template>

<style lang="postcss">
a {
	@apply mr-4;
}
</style>
