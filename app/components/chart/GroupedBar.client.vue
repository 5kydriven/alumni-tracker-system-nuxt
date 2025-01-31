<script setup lang="ts">
	import {
		VisXYContainer,
		VisGroupedBar,
		VisAxis,
		VisBulletLegend,
	} from '@unovis/vue';

	const props = defineProps<{ data: any }>();
	const x = (d: any) => d.year;
	const y = [
		(d: any) => d.employed,
		(d: any) => d.unemployed,
		(d: any) => d.unknown,
	];

	const groups = [
		{ key: 'employed', name: 'Employed' },
		{ key: 'unemployed', name: 'Unemployed' },
		{ key: 'unknown', name: 'Unknown' },
	];

	const colors = ['#22c55e', '#ef4444', '#d1d5db'];

	const items = groups.map((item, i) => ({
		...item,
		inactive: false,
		color: colors[i],
	}));
</script>

<template>
	<div class="border rounded shadow p-2 w-full flex flex-col">
		<label>Alumni employability</label>
		<VisBulletLegend
			:items="items"
			class="mb-4" />
		<VisXYContainer :data="props.data">
			<VisGroupedBar
				:color="colors"
				roundedCorners
				:barMinHeight="0"
				:x="x"
				:y="y" />
			<VisAxis
				type="x"
				label="Year"
				:gridLine="false"
				:numTicks="props.data.length" />
			<VisAxis
				type="y"
				label="Total" />
			<!-- <VisTooltip :triggers="triggers" /> -->
		</VisXYContainer>
	</div>
</template>
