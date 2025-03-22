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

	const { data: total, status: totalStatus } = useLazyFetch<
		H3Response<{
			alumni: number;
			registrar: number;
			job: number;
			employer: number;
		}>
	>('/api/admin');

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
	<Navbar>
		<div class="flex gap-2 items-center">
			<UButton
				@click="slideOver.open(AdminSlideOver, { onClose: slideOver.close })"
				class="lg:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm" />
			<label class="text-xl font-bold">Home</label>
		</div>
	</Navbar>
	<div class="p-4 flex flex-col gap-4">
		<label class="font-bold text-lg">Overview</label>
		<AdminOverview
			v-if="totalStatus == 'success'"
			:total="total?.data" />
		<div
			v-else
			class="w-full flex gap-4">
			<USkeleton class="h-[90px] rounded-lg" />
			<USkeleton class="h-[90px] rounded-lg" />
			<USkeleton class="h-[90px] rounded-lg" />
			<USkeleton class="h-[90px] rounded-lg" />
		</div>
		<div class="flex gap-4 h-full">
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
