<script setup lang="ts">
	import RejectModal from '~/components/admin/RejectModal.vue';

	const { convertToDate } = useConverter();
	const { capitalCase } = useFormatter();
	const { q } = useSearch();
	const { toastResponse } = useToastComposables();
	const modal = useModal();
	const page = ref(1);
	const limit = ref(15);
	const isLoading = ref(false);

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

	async function onApproved(uid: string) {
		isLoading.value = true;
		const res = await $fetch(`/api/admin/user/queue/${uid}`, {
			method: 'PUT',
		});
		await refreshNuxtData('employer-queue');
		toastResponse(res);
		isLoading.value = false;
	}

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
		<template #actions-data="{ row }">
			<div class="flex gap-2 items-center">
				<UButton
					:key="row.uid"
					variant="solid"
					:ui="{ rounded: 'rounded-lg' }"
					label="Approved"
					:loading="isLoading"
					@click="onApproved(row.uid)" />
				<UButton
					variant="solid"
					color="red"
					:ui="{ rounded: 'rounded-lg' }"
					@click="
						modal.open(RejectModal, {
							onClose: modal.close,
							uid: row.uid,
							email: row.email,
							displayName: row.name,
						})
					"
					label="Reject" />
			</div>
		</template>
		<template #expand="{ row }">
			<div class="p-4 flex flex-col gap-2">
				<div
					v-for="(value, key) in row.userCredentials"
					:key="key"
					class="flex gap-2">
					<label class="font-bold">{{ capitalCase(key) }}:</label>
					<span>{{ value }}</span>
				</div>
				<!-- <pre>{{ row.userCredentials }}</pre> -->
			</div>
		</template>
	</UTable>
</template>
