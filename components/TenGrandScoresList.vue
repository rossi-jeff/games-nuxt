<template>
    <div class="ten-grand-scores-list">
        <div class="ten-grand-score" v-for="ten_grand of props.items" :key="ten_grand.id">
            <div class="link">{{ ten_grand.id }}</div>
			<div class="status">{{ ten_grand.Status }}</div>
			<div class="status">{{ ten_grand.Score }}</div>
        </div>
    </div>
</template>


<script lang="ts" setup>
const props = defineProps(['items'])
</script>

<style lang="postcss">
div.ten-grand-score {
    @apply flex flex-wrap justify-between mx-2 border border-dashed border-b-gray-500;
}
</style>