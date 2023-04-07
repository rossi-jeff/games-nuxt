<template>
	<div class="sea-battle-ship-display">
		<div class="ship-icon" v-if="props.ship">
			<div
				v-for="point of props.ship.points"
				:key="point.id"
				:class="pointClass(point)"
			>
				<span></span>
			</div>
		</div>
		<div class="ship-type">{{ props.ship.Type }}</div>
	</div>
</template>

<script lang="ts" setup>
import { PointType } from '../utils/types/point-type.type'
const props = defineProps(['ship'])

const pointClass = (point: PointType) => {
	if (!props.ship || !props.ship.hits || !props.ship.hits.length) return ''
	if (
		props.ship.hits.find(
			(h: { Horizontal: string | undefined; Vertical: number | undefined }) =>
				h.Horizontal == point.Horizontal && h.Vertical == point.Vertical
		)
	)
		return 'Hit'
	return ''
}
</script>

<style lang="postcss">
div.sea-battle-ship-display {
	@apply border border-black rounded p-2 mr-4 mb-4 max-w-fit;
}
div.ship-icon {
	@apply flex flex-wrap justify-center;
}
div.ship-icon div {
	@apply w-8 h-8 bg-slate-300 text-center;
}
div.ship-type {
	@apply font-bold text-center;
}
</style>
