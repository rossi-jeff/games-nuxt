<template>
	<div class="yacht-scores-list">
		<div class="yacht" v-for="yacht of props.items" :key="yacht.id">
			<div class="link">{{ yacht.id }}</div>
			<div class="user">
				{{ yacht.user ? yacht.user.UserName : 'Anonymous' }}
			</div>
			<div class="total">{{ yacht.Total }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.yacht {
	@apply flex flex-wrap mx-2 border border-dashed border-b-gray-500;
}
div.user {
	@apply flex-grow pl-2;
}
</style>
