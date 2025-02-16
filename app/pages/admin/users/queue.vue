<script setup lang="ts">
	const { convertToDate } = useConverter();
	const { q } = useSearch();

	const page = ref(1);
	const limit = ref(20);

	const offset = computed(() => (page.value - 1) * limit.value);

	const query = computed(() => ({
		q: q.value,
		limit: limit.value,
		offset: offset.value,
	}));

	const { data: employers, status } = useLazyFetch<PaginatedResponse<User[]>>(
		'/api/admin/user/queue',
		{
			key: 'employer-queue',
			method: 'GET',
			default: () => ({
				data: [],
				total: 0,
			}),
			query,
		},
	);

	const columns = [
		{ key: 'id', label: 'No.' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'created', label: 'Date Register' },
		{ key: 'actions' },
	];

	const expand = ref({
		openedRows: [employers.value],
		row: {},
	});

	onUnmounted(() => {
		q.value = '';
	});
</script>

<template>
	<UTable
		v-model:expand="expand"
		:loading="status !== 'success'"
		:empty-state="{
			icon: 'i-heroicons-circle-stack-20-solid',
			label: 'No employer.',
		}"
		:ui="{
			th: {
				base: 'sticky z-10 top-0 bg-gray-100',
			},
			td: {
				padding: 'p-2',
			},
			wrapper: 'flex-1',
		}"
		:rows="employers.data || []"
		:columns="columns"
		class="w-full">
		<template #id-data="{ row }">{{ row.id + 1 }}</template>
		<template #name-data="{ row }">
			<label class="capitalize">{{ row.name }}</label>
		</template>
		<template #created-data="{ row }">
			<label class="capitalize">{{ convertToDate(row.createdAt) }}</label>
		</template>
		<template #actions-data>
			<div class="flex gap-2 items-center">
				<UButton
					variant="outline"
					:ui="{ rounded: 'rounded-full' }"
					label="Approved" />
				<UButton
					variant="outline"
					color="red"
					:ui="{ rounded: 'rounded-full' }"
					label="Reject" />
			</div>
		</template>
		<template #expand="{ row }">
			<div class="p-4">
				<pre>{{ row.userCredentials }}</pre>
			</div>
		</template>
	</UTable>
</template>
