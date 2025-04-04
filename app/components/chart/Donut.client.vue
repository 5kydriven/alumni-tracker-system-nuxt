<script setup lang="ts">
	import {
		VisSingleContainer,
		VisDonut,
		VisTooltip,
		VisBulletLegend,
	} from '@unovis/vue';
	import { Donut } from '@unovis/ts';

	const props = defineProps<{ data: any; status: string }>();
	const triggers = {
		[Donut.selectors.segment]: (d: any) =>
			`${d.data.label}: ${d.data.value} ${props.status}`,
	};

	const legendItems = Object.entries(props.data).map(([_, data]: any) => ({
		name: data.label.charAt(0).toUpperCase() + data.label.slice(1),
	}));
</script>

<template>
	<div
		class="flex flex-col border rounded-lg shadow p-2 w-full md:max-w-[400px]">
		<slot />
		<VisBulletLegend :items="legendItems" />
		<VisSingleContainer
			:height="300"
			:width="250"
			class="!flex justify-center">
			<VisTooltip
				:triggers="triggers"
				verticalPlacement="top"
				:verticalShift="0" />
			<VisDonut
				:value="(d: any) => d.value"
				:data="props.data"
				:arcWidth="0" />
		</VisSingleContainer>
	</div>
</template>
