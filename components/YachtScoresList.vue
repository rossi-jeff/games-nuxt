<template>
	<div class="yacht-scores-list">
		<div class="yacht-header">
			<div class="link">{{ props.label }}</div>
			<div class="user">User</div>
			<div class="total">Score</div>
		</div>
		<div class="yacht-score" v-for="yacht of props.items" :key="yacht.id">
			<div class="link">
				<button @click="followLink(yacht.id)">{{ props.label }}</button>
			</div>
			<div class="user">
				{{ yacht.user ? yacht.user.UserName : 'Anonymous' }}
			</div>
			<div class="total">{{ yacht.Total }}</div>
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
div.yacht-scores-list {
	@apply my-2;
}
div.yacht-header {
	@apply flex flex-wrap justify-between font-bold bg-slate-200 mb-1 px-1;
}
div.yacht-score {
	@apply flex flex-wrap border border-dashed border-b-gray-500;
}
div.user {
	@apply flex-grow pl-2 text-center;
}
div.yacht-scores-list button {
	@apply border border-black rounded my-1 px-2 py-1 bg-slate-200;
}
div.yacht-scores-list button:hover {
	@apply bg-slate-600 text-white;
}
</style>
