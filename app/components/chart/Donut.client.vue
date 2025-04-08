<script setup lang="ts">
	import {
		VisSingleContainer,
		VisDonut,
		VisTooltip,
		VisBulletLegend,
	} from '@unovis/vue';
	import { Donut } from '@unovis/ts';

	interface PieData {
		label: string;
		value: number;
		inactive: boolean;
		name: string;
		color: string;
	}

	const props = defineProps<{ data: PieData[]; status: string }>();
	const duration = ref<Number | undefined>(0);
	const labelColors: Record<string, string> = {
		BSIT: '#8b5cf6',
		BSCRIM: '#ef4444',
		BSHM: '#eab308',
		BSAB: '#22c55e',
		BEED: '#3b82f6',
		'BSED-SCI': '#64748b',
		'BSED-MATH': '#f97316',
	};

	const triggers = {
		[Donut.selectors.segment]: (d: any) => `${d.data.label}: ${d.data.value}`,
	};

	const items = ref(
		props.data
			.filter((item) => item.value >= 1)
			.map((item) => ({
				...item,
				inactive: false,
				name: item.label,
				color: labelColors[item.label.toUpperCase()],
			})),
	);

	const filteredItems = computed(() =>
		items.value.filter((item) => !item?.inactive),
	);

	function updateItems(item: any, i: number) {
		const newItems = [...items.value];
		newItems[i] = { ...item, inactive: !item.inactive };
		duration.value = 1000;
		items.value = newItems;
		console.log(items.value);
	}

	watchEffect(() => console.log(props.data));
</script>

<template>
	<div
		class="flex flex-col border rounded-lg shadow p-2 w-full md:max-w-[400px]">
		<div class="flex justify-between items-center w-full">
			<div class="flex gap-2 items-center">
				<label>Courses</label>
				<UBadge
					size="xs"
					variant="subtle"
					:label="filteredItems.reduce((acc: any, item: any) => acc + item.value, 0)" />
			</div>
			<slot />
		</div>

		<VisBulletLegend
			:items="items"
			@legend-item-click="updateItems" />
		<VisSingleContainer
			:data="filteredItems"
			:duration="duration"
			:height="300"
			:width="250"
			class="!flex justify-center">
			<VisTooltip
				:triggers="triggers"
				verticalPlacement="top"
				:verticalShift="0" />
			<VisDonut
				:color="(d: PieData) => d.color"
				:value="(d: PieData) => d.value"
				:arcWidth="0"
				:labels="(d: PieData) => d.value" />
		</VisSingleContainer>
	</div>
</template>
