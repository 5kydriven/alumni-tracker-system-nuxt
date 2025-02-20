<script setup lang="ts">
	import { RegistrarSlideOver } from '#components';

	definePageMeta({
		middleware: ['personel'],
		layout: 'registrar',
	});

	const slideOver = useSlideover();

	const { data: total } = useFetch<
		H3Response<{
			alumni: number;
			employed: number;
			unemployed: number;
			unknown: number;
		}>
	>('/api/registrar', {
		method: 'GET',
	});
</script>

<template>
	<Navbar class="gap-2">
		<div class="flex gap-2">
			<UButton
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				class="lg:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm" />
			<label class="font-bold text-lg">Home</label>
		</div>
	</Navbar>
	<div class="p-4 flex flex-col gap-4">
		<div class="w-full flex gap-4">
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total alumni</label>
					<span class="text-lg font-bold">{{ total?.data?.alumni }}</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total employed</label>
					<span class="text-lg font-bold">{{ total?.data?.employed }}</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total unemployed</label>
					<span class="text-lg font-bold">{{ total?.data?.unemployed }}</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total unknown</label>
					<span class="text-lg font-bold">{{ total?.data?.unknown }}</span>
				</div>
			</div>
		</div>
		<div class="flex gap-4">
			<ChartGroupedBar
				:data="[
					{ year: 2022, employed: 10, unemployed: 1, unknown: 1 },
					{ year: 2023, employed: 20, unemployed: 5, unknown: 2 },
					{ year: 2024, employed: 1, unemployed: 2, unknown: 3 },
					{ year: 2025, employed: 4, unemployed: 3, unknown: 1 },
				]" />
			<ChartDonut
				:data="[
					{ label: 'BSIT', value: 2 },
					{ label: 'CRIM', value: 5 },
					{ label: 'EDUC', value: 7 },
				]" />
		</div>
	</div>
</template>
