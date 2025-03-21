<script setup lang="ts">
	import { AdminUserDelete, AdminUserEdit } from '#components';

	const { q } = useSearch();
	const store = useUserStore();
	const modal = useModal();
	const page = ref(1);
	const limit = ref(10);

	const offset = computed(() => (page.value - 1) * limit.value);

	const query = computed(() => ({
		q: q.value,
		limit: limit.value,
		offset: offset.value,
		role: store.selectedRole,
	}));

	const { data: users, status } = useLazyFetch<PaginatedResponse<User[]>>(
		'/api/admin/user',
		{
			key: 'users',
			method: 'GET',
			default: () => ({
				data: [],
				total: 0,
			}),
			query,
			watch: [q, page],
		},
	);

	const columns = [
		{ key: 'id', label: 'No.' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		// { key: 'password', label: 'Password' },
		{ key: 'role', label: 'Role' },
		{ key: 'actions' },
	];

	onUnmounted(() => {
		q.value = '';
	});
</script>

<template>
	<UTable
		:loading="status !== 'success'"
		:empty-state="{
			icon: 'i-heroicons-circle-stack-20-solid',
			label: 'No items.',
		}"
		:ui="{
			th: {
				base: 'sticky z-10 top-0 bg-gray-100',
			},
			wrapper: 'flex-1',
		}"
		:rows="users.data || []"
		:columns="columns"
		class="w-full">
		<template #id-data="{ row }">{{ row.id + 1 }}</template>
		<template #name-data="{ row }">
			<label class="capitalize">{{ row.name }}</label>
		</template>
		<template #role-data="{ row }">
			<label class="capitalize">{{ row.role }}</label>
		</template>
		<template #actions-data="{ row }">
			<UDropdown
				:items="[
					[
						{
							label: 'Edit',
							icon: 'i-heroicons-pencil-square-20-solid',
							click: () => {
								modal.open(AdminUserEdit, {
									userData: row,
									onClose: modal.close,
								});
							},
						},
						{
							label: 'Delete',
							icon: 'i-heroicons-trash-20-solid',
							click: () => {
								modal.open(AdminUserDelete, {
									uid: row.uid,
									onClose: modal.close,
								});
							},
						},
					],
				]">
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-ellipsis-horizontal-20-solid" />
			</UDropdown>
		</template>
	</UTable>
	<div
		:class="(users.data?.length ?? 0) == 10 ? 'flex' : 'hidden'"
		class="py-2 px-4 items-center border-t justify-between">
		<div>
			<span class="text-sm leading-5">
				Showing
				<span class="font-medium">
					{{ (page - 1) * limit + 1 }}
				</span>
				to
				<span class="font-medium">
					{{ Math.min(page * limit, users.total as number) }}
				</span>
				of
				<span class="font-medium">
					{{ users.total }}
				</span>
				results
			</span>
		</div>
		<UPagination
			v-model="page"
			:page-count="limit"
			:total="users.total as number"
			:to="(page: number) => ({
      query: { page },
    })" />
	</div>
</template>
