<template>
	<div class="guess-word-scores-list">
		<div class="guess-word-header">
			<div class="link">{{ props.label }}</div>
			<div class="gw-user">User</div>
			<div class="status">Status</div>
			<div class="gw-score">Score</div>
			<div class="word">Word</div>
			<div class="length">Length</div>
		</div>
		<div
			class="guess-word-score"
			v-for="guess_word of props.items"
			:key="guess_word.id"
		>
			<div class="link">
				<button @click="followLink(guess_word.id)">{{ props.label }}</button>
			</div>
			<div class="gw-user">
				{{ guess_word.user ? guess_word.user.UserName : 'Anonymous' }}
			</div>
			<div class="status">{{ guess_word.Status }}</div>
			<div class="gw-score">{{ guess_word.Score }}</div>
			<div class="word">{{ guess_word.word ? guess_word.word.Word : '' }}</div>
			<div class="length">
				{{ guess_word.word ? guess_word.word.Length : 0 }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items', 'label'])
const emit = defineEmits(['followLink'])

const followLink = (id: number) => {
	emit('followLink', { id })
}
</script>

<style lang="postcss">
div.guess-word-header {
	@apply flex flex-wrap justify-between mx-2 font-bold bg-gray-200 mb-1 px-1;
}
div.guess-word-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
div.link {
	@apply w-20 text-left;
}
div.gw-user {
	@apply w-32 text-left;
}
div.state,
div.gw-score,
div.word {
	@apply w-20 text-center;
}
div.length {
	@apply w-20 text-right;
}
</style>
