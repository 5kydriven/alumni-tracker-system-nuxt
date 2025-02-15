<script setup lang="ts">
	import { AdminUserAdd, AdminSlideOver, AdminUserDelete } from '#components';

	definePageMeta({
		middleware: ['admin'],
		layout: 'admin',
	});

	const modal = useModal();
	const slideOver = useSlideover();

	const selectedRole = ref(['registrar', 'employer']);

	const q = ref();
	const page = ref(1);
	const limit = ref(20);

	const offset = computed(() => (page.value - 1) * limit.value);

	const query = computed(() => ({
		q: q.value,
		limit: limit.value,
		offset: offset.value,
		role: selectedRole.value,
	}));

	const { data: users, status } = useFetch<PaginatedResponse<User[]>>(
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
		{ key: 'password', label: 'Password' },
		{ key: 'role', label: 'Role' },
		{ key: 'actions' },
	];

	watch(users, () => console.log(users.value));
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
			<label class="font-bold text-lg text-black">User's</label>
		</div>
		<div class="flex items-center gap-4">
			<UInput
				icon="i-heroicons-magnifying-glass-20-solid"
				size="sm"
				color="white"
				:trailing="false"
				placeholder="Search..."
				v-model="q" />
			<UButton
				icon="i-heroicons-pencil-square"
				size="sm"
				color="gray"
				variant="solid"
				label="Add User"
				trailing
				@click="
					modal.open(AdminUserAdd, {
						onClose: modal.close,
					})
				" />
		</div>
	</Navbar>
	<SubNavbar>
		<div class="flex items-center gap-4">
			<USelectMenu
				v-model="selectedRole"
				:options="['registrar', 'employer', 'alumni']"
				multiple
				placeholder="Select Role" />
			<!-- <USelectMenu v-model="selected" :options="people" multiple placeholder="Location" /> -->
		</div>
		<!-- <USelectMenu v-model="selected" :options="people" multiple placeholder="Display" /> -->
	</SubNavbar>
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
			td: {
				padding: 'p-2',
			},
			wrapper: 'flex-1',
		}"
		:rows="users.data || []"
		:columns="columns"
		class="w-full">
		<template #id-data="{ row }">{{ row.id + 1 }}</template>
		<template #actions-data="{ row }">
			<UDropdown
				:items="[
					[
						{
							label: 'Edit',
							icon: 'i-heroicons-pencil-square-20-solid',
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
		:class="(users.data?.length ?? 0) > 12 ? 'flex' : 'hidden'"
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
