<script setup lang="ts">
	import AcceptModal from '~/components/admin/AcceptModal.vue';
	import RejectModal from '~/components/admin/RejectModal.vue';

	const { convertToDate } = useConverter();
	const { capitalCase } = useFormatter();
	const { q } = useSearch();
	const modal = useModal();
	const page = ref(1);
	const limit = ref(15);

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
		<template #actions-data="{ row }">
			<div class="flex gap-2 items-center">
				<UButton
					:key="row.uid"
					variant="soft"
					:ui="{ rounded: 'rounded-lg' }"
					label="Approved"
					@click="
						modal.open(AcceptModal, {
							onClose: modal.close,
							uid: row.uid,
						})
					" />
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
					:key="key">
					<div
						v-if="String(key) != 'logo' && String(key) != 'businessPermit'"
						class="flex gap-2">
						<label class="font-bold">{{ capitalCase(key) }}:</label>
						<span>{{ value }}</span>
					</div>
				</div>
				<div class="flex gap-4">
					<UButton
						variant="link"
						:to="row.userCredentials.logo"
						target="_blank"
						rel="noopener noreferrer"
						>View Logo</UButton
					>
					<UButton
						variant="link"
						:to="row.userCredentials.businessPermit"
						target="_blank"
						rel="noopener noreferrer"
						>View Business Permit</UButton
					>
				</div>
				<!-- <pre>{{ row.userCredentials }}</pre> -->
			</div>
		</template>
	</UTable>
</template>
