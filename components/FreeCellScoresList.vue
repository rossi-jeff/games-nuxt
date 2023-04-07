<template>
	<div class="free-cell-scores-list">
		<div class="free-cell-header">
			<div class="fc-user">User</div>
			<div class="status">Status</div>
			<div class="time">Time</div>
			<div class="moves">Moves</div>
		</div>
		<div
			class="free-cell-score"
			v-for="free_cell of props.items"
			:key="free_cell.id"
		>
			<div class="fc-user">
				{{ free_cell.user ? free_cell.user.UserName : 'Anonymous' }}
			</div>
			<div class="status">{{ free_cell.Status }}</div>
			<div class="time">{{ formatElapsedSeconds(free_cell.Elapsed) }}</div>
			<div class="moves">{{ free_cell.Moves }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.free-cell-scores-list {
	@apply my-2;
}
div.free-cell-header {
	@apply flex flex-wrap justify-between font-bold bg-gray-200 mb-1 px-1;
}
div.free-cell-score {
	@apply flex flex-wrap justify-between border border-dashed border-b-gray-500;
}
div.fc-user {
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
