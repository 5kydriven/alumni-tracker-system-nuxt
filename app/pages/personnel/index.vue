<script setup lang="ts">
	import { PersonnelSlideOver } from '#components';

	definePageMeta({
		middleware: ['personnel'],
		layout: 'personnel',
	});

	const slideOver = useSlideover();
	const employmentOptions = ['employed', 'unemployed', 'unknown'];

	const selected = ref(employmentOptions[2]);
	const query = computed(() => ({
		status: selected.value,
	}));

	const { data: total } = useLazyFetch<
		H3Response<{
			alumni: number;
			employed: number;
			unemployed: number;
			unknown: number;
		}>
	>('/api/personnel', {
		method: 'GET',
	});

	const { data: pie, status: pieLoading } = useLazyFetch<H3Response>(
		'/api/admin/total-course',
		{
			query,
		},
	);

	const { data: bar, status: barLoading } = useLazyFetch<H3Response>(
		'/api/admin/employability-analytics',
	);
</script>

<template>
	<Navbar class="gap-2">
		<div class="flex gap-2 items-center">
			<UButton
				@click="
					slideOver.open(PersonnelSlideOver, { onClose: slideOver.close })
				"
				class="lg:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm" />
			<label class="font-bold text-xl">Home</label>
		</div>
	</Navbar>
	<div class="p-4 flex flex-col gap-4">
		<label class="font-bold text-lg">Overview</label>
		<div class="w-full flex gap-4 flex-col md:flex-row">
			<div class="flex gap-4 flex-col sm:flex-row w-full">
				<div
					class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
					<div
						class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
						<UIcon
							name="i-heroicons-user"
							class="w-6 h-6 text-zuccini" />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-sm text-gray-500">Total alumni</label>
						<span class="text-lg font-bold">{{ total?.data?.alumni }}</span>
					</div>
				</div>
				<div
					class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
					<div
						class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
						<UIcon
							name="i-heroicons-user"
							class="w-6 h-6 text-zuccini" />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-sm text-gray-500">Total employed</label>
						<span class="text-lg font-bold">{{ total?.data?.employed }}</span>
					</div>
				</div>
			</div>
			<div class="flex gap-4 flex-col sm:flex-row w-full">
				<div
					class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
					<div
						class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
						<UIcon
							name="i-heroicons-user"
							class="w-6 h-6 text-zuccini" />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-sm text-gray-500">Total unemployed</label>
						<span class="text-lg font-bold">{{ total?.data?.unemployed }}</span>
					</div>
				</div>
				<div
					class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
					<div
						class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
						<UIcon
							name="i-heroicons-user"
							class="w-6 h-6 text-zuccini" />
					</div>
					<div class="flex flex-col gap-2">
						<label class="text-sm text-gray-500">Total unknown</label>
						<span class="text-lg font-bold">{{ total?.data?.unknown }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="flex gap-4 h-full flex-col md:flex-row">
			<ChartGroupedBar
				v-if="barLoading == 'success' && bar?.data"
				:data="bar?.data ?? []" />
			<USkeleton
				v-else
				class="h-[382px] w-2/3" />

			<ChartDonut
				class="w-1/3"
				v-if="pieLoading == 'success'"
				:data="pie?.data ?? []"
				:status="selected as string">
				<div class="flex justify-between">
					<label>Course</label>
					<USelectMenu
						:options="employmentOptions"
						v-model="selected" />
				</div>
			</ChartDonut>
			<USkeleton
				v-else
				class="h-[382px] w-1/3" />
		</div>
	</div>
</template>
