<script setup lang="ts">
	import {
		VisSingleContainer,
		VisDonut,
		VisTooltip,
		VisBulletLegend,
	} from '@unovis/vue';
	import { Donut } from '@unovis/ts';

	const props = defineProps<{ data: any }>();
	const triggers = {
		[Donut.selectors.segment]: (d: any) =>
			`${d.data.label}: ${d.data.value} employed`,
	};

	const legendItems = Object.entries(props.data).map(([_, data]: any) => ({
		name: data.label.charAt(0).toUpperCase() + data.label.slice(1),
	}));

	const employmentOptions = ['employed', 'unemployed', 'unknown'];

	const selected = ref(employmentOptions[0]);
</script>

<template>
	<div class="flex flex-col border rounded shadow p-2 w-full max-w-[400px]">
		<div class="flex justify-between">
			<label>Course</label>
			<USelectMenu
				:options="employmentOptions"
				v-model="selected" />
		</div>
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
