<template>
	<div class="concentration-scores-list">
		<div class="concentration-header">
			<div class="c-user">User</div>
			<div class="status">Status</div>
			<div class="time">Time</div>
			<div class="moves">Moves</div>
		</div>
		<div
			class="concentration-score"
			v-for="concentration of props.items"
			:key="concentration.id"
		>
			<div class="c-user">
				{{ concentration.user ? concentration.user.UserName : 'Anonymous' }}
			</div>
			<div class="status">{{ concentration.Status }}</div>
			<div class="time">{{ formatElapsedSeconds(concentration.Elapsed) }}</div>
			<div class="moves">{{ concentration.Moves }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.concentration-scores-list {
	@apply my-2;
}
div.concentration-header {
	@apply flex flex-wrap justify-between font-bold bg-gray-200 mb-1 px-1;
}
div.concentration-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-slate-500;
}
div.c-user {
	@apply w-32 text-left;
}
div.status,
div.time {
	@apply w-20 text-center;
}
div.moves {
	@apply w-20 text-right;
}
</style>
