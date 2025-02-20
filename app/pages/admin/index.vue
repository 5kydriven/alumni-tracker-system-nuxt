<script setup lang="ts">
	import { AdminSlideOver } from '#components';

	definePageMeta({
		middleware: ['admin'],
		layout: 'admin',
	});

	const slideOver = useSlideover();

	const employmentOptions = ['employed', 'unemployed', 'unknown'];

	const selected = ref(employmentOptions[2]);
	const query = computed(() => ({
		status: selected.value,
	}));

	const { data: total } = useFetch<
		H3Response<{
			alumni: number;
			registrar: number;
			job: number;
			employer: number;
		}>
	>('/api/admin', {
		method: 'GET',
	});

	const { data: pie } = useFetch<H3Response>('/api/admin/total-course', {
		method: 'GET',
		query,
	});
</script>

<template>
	<Navbar>
		<div class="flex gap-2 items-center">
			<UButton
				@click="slideOver.open(AdminSlideOver, { onClose: slideOver.close })"
				class="lg:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm" />
			<label class="text-lg font-bold">Home</label>
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
					<label class="text-sm text-gray-500">Total employer</label>
					<span class="text-lg font-bold">{{ total?.data?.employer }}</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total personel</label>
					<span class="text-lg font-bold">{{ total?.data?.registrar }}</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total jobs</label>
					<span class="text-lg font-bold">{{ total?.data?.job }}</span>
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
			<ChartDonut :data="pie?.data"
				><div class="flex justify-between">
					<label>Course</label>
					<USelectMenu
						:options="employmentOptions"
						v-model="selected" /></div
			></ChartDonut>
		</div>
	</div>
</template>
