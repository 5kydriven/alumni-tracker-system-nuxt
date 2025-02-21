<script setup lang="ts">
	import {
		VisXYContainer,
		VisGroupedBar,
		VisAxis,
		VisBulletLegend,
		VisTooltip,
	} from '@unovis/vue';
	import { GroupedBar } from '@unovis/ts';

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

	const triggers = {
		[GroupedBar.selectors.barGroup]: (d: any) => `
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
			:numTicks="props.data.length" />
		<VisAxis
			type="y"
			label="Total" />
		<VisTooltip :triggers="triggers" />
	</VisXYContainer>
</template>
