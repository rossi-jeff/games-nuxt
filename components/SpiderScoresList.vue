<template>
	<div class="spider-scores-list">
		<div class="spider-header">
			<div class="s-user">User</div>
			<div class="status">Status</div>
			<div class="suits">Suits</div>
			<div class="time">Time</div>
			<div class="moves">Moves</div>
		</div>
		<div class="spider-score" v-for="spider of props.items" :key="spider.id">
			<div class="s-user">
				{{ spider.user ? spider.user.UserName : 'Anonymous' }}
			</div>
			<div class="status">{{ spider.Status }}</div>
			<div class="status">{{ spider.Suits }}</div>
			<div class="time">{{ formatElapsedSeconds(spider.Elapsed) }}</div>
			<div class="moves">{{ spider.Moves }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.spider-scores-list {
	@apply my-2;
}
div.spider-header {
	@apply flex flex-wrap justify-between font-bold bg-gray-200 mb-1 px-1;
}
div.spider-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-gray-500;
}
div.s-user {
	@apply w-32 text-left;
}
div.status,
div.suits,
div.time {
	@apply w-20 text-center;
}
div.moves {
	@apply w-20 text-right;
}
</style>
