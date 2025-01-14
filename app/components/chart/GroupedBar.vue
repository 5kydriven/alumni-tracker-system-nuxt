<script setup lang="ts">
	import {
		VisXYContainer,
		VisGroupedBar,
		VisAxis,
		VisTooltip,
	} from '@unovis/vue';
	import { GroupedBar, Axis } from '@unovis/ts';

	const props = defineProps<{ data: any }>();
	const x = (d: any) => d.year;
	const y = [
		(d: any) => d.employed,
		(d: any) => d.unemployed,
		(d: any) => d.unknown,
	];
	const triggers = {
		[GroupedBar.selectors.barGroup]: (d: any) =>
			`<span>${d.employed}, ${d.unemployed}, ${d.unknown}</span>`,
	};

	const events = {
		[Axis.selectors.axis]: {
			mouseover: (d: number | Date) => {
				console.log(d);
			},
			mouseout: (d: number | Date) => {
				console.log(d);
			},
		},
	};
</script>

<template>
	<VisXYContainer :data="props.data">
		<VisGroupedBar
			:x="x"
			:y="y"
		/>
		<VisAxis
			type="x"
			label="Employed vs Unemployed"
			:numTicks="props.data.length"
			:events="events"
		/>
		<!-- <VisTooltip :triggers="triggers" /> -->
	</VisXYContainer>
</template>
