<template>
	<div class="hang-man-scores-list">
		<div
			class="hang-man-score"
			v-for="hang_man of props.items"
			:key="hang_man.id"
		>
			<div class="link">{{ hang_man.id }}</div>
			<div class="status">{{ hang_man.Status }}</div>
			<div class="score">{{ hang_man.Score }}</div>
			<div class="word">{{ hang_man.word ? hang_man.word.Word : '' }}</div>
			<div class="length">
				{{ hang_man.word ? hang_man.word.Length : 0 }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.hang-man-score {
	@apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>
