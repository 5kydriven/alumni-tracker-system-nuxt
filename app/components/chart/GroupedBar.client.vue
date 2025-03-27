<script setup lang="ts">
	import {
		VisXYContainer,
		VisGroupedBar,
		VisAxis,
		VisBulletLegend,
		VisTooltip,
	} from '@unovis/vue';
	import { GroupedBar } from '@unovis/ts';

	interface BarData {
		year: number;
		employed: number;
		unemployed: number;
		unknown: number;
	}

	const props = defineProps<{ data: BarData[] }>();
	const x = (d: BarData) => d.year;
	const y = [
		(d: BarData) => d.employed,
		(d: BarData) => d.unemployed,
		(d: BarData) => d.unknown,
	];

	console.log(props.data);

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

	const triggers = {
		[GroupedBar.selectors.barGroup]: (d: BarData) => `
      <div class="w-40 flex flex-col gap-2">
				<div class="flex justify-between border-l-4 border-[#22c55e] px-2">
					<labe>Employed:</labe>
					<span>${d.employed}</span>
				</div>
				<div class="w-40 flex justify-between border-l-4 border-[#ef4444] px-2">
					<labe>Unemployed:</labe>
					<span>${d.unemployed}</span>
				</div>
				<div class="w-40 flex justify-between border-l-4 border-[#d1d5db] px-2">
					<labe>Unknown:</labe>
					<span>${d.unknown}</span>
				</div>
			</div>
    `,
	};
</script>

<template>
	<div class="border rounded-lg shadow p-2 flex flex-col w-full md:w-2/3">
		<label>Alumni employability</label>
		<VisBulletLegend
			:items="items"
			class="mb-4" />
		<VisXYContainer :data="props.data">
			<VisGroupedBar
				:color="colors"
				:barMinHeight="1"
				:x="x"
				:y="y" />
			<VisAxis
				type="x"
				label="Year"
				:gridLine="false"
				:numTicks="props.data.length - 1" />
			<VisAxis
				type="y"
				label="Total" />
			<VisTooltip :triggers="triggers" />
		</VisXYContainer>
	</div>
</template>
