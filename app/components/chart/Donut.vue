<script setup lang="ts">
	import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue';
	import { Donut } from '@unovis/ts';

	const props = defineProps<{ data: any }>();
	const value = (d: any) => d.value;
	const triggers = {
		[Donut.selectors.segment]: (d: any) =>
			`${d.data.label}: ${d.data.value} employed`,
	};
</script>

<template>
	<VisSingleContainer
		:data="props.data"
		:width="250"
		:heigth="300"
		class="border !flex items-center justify-center !w-fit px-8 py-0"
	>
		<VisTooltip
			:triggers="triggers"
			verticalPlacement="top"
			:verticalShift="0"
		/>
		<VisDonut
			:value="value"
			:arcWidth="0"
		/>
	</VisSingleContainer>
</template>
