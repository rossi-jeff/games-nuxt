<template>
	<div class="home-content">
		<h3>Welcome Visitor</h3>
		<div>
			The pages of this site are a collection of games written in typescript.
			They have <a href="https://nestjs.com/">NestJS</a> backend and a
			<a href="https://www.mysql.com/">MySQL</a> database and most calculations
			are performed on the server.
		</div>
		<div>
			The site itself was constructed using the following tools and resources:
			<ul>
				<li>
					<a href="https://nuxt.com/">Nuxt</a> -
					<i
						>Build your next Vue.js application with confidence using Nuxt. An
						open source framework under MIT license that makes web development
						simple and powerful.</i
					>
					(site documentation)
				</li>
				<li>
					<a href="https://tailwindcss.com/">Tailwind CSS</a> -
					<i
						>A utility-first CSS framework packed with classes like flex, pt-4,
						text-center and rotate-90 that can be composed to build any design,
						directly in your markup.</i
					>
					(site documentation)
				</li>
				<li>
					Dice images downloaded from <a href="https://css.gg/">CSS.GG</a>
				</li>
				<li>
					Playing Card images downloaded from
					<a href="https://tekeye.uk/playing_cards/svg-playing-cards"
						>Tek Eye</a
					>
				</li>
			</ul>
		</div>
		<div>
			Take some time to play a few games and think about the problem solving
			skills involved in constucting them.
		</div>
		<div>
			The register and sign in pages serve two purposes:
			<ul>
				<li>proof of concept for user management</li>
				<li>scores will show a username rather than anonymous</li>
				<li>you may continue some in progress games</li>
			</ul>
			No contact information is collected.
		</div>
		<div>
			The source code for the games site and the backend are available upon
			request.
		</div>
	</div>
</template>

<style lang="postcss">
div.home-content {
	@apply mx-2 my-2;
}
div.home-content h3 {
	@apply text-xl font-bold mb-2 text-indigo-600;
}
div.home-content div {
	@apply mb-4;
}
div.home-content ul {
	@apply list-disc list-inside mb-4;
}
div.home-content li {
	@apply ml-2;
}
div.home-content a {
	@apply font-bold text-indigo-600;
}
div.home-content a:hover {
	@apply underline text-indigo-900;
}
</style>
