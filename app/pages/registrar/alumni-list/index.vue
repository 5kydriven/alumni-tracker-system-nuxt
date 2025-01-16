<script setup lang="ts">
	import { RegistrarModalAdd, RegistrarSlideOver } from '#components';
	import useComposableToast from '~/composables/useToastComposables';

	definePageMeta({
		layout: 'registrar',
	});

	const slideOver = useSlideover();
	const modal = useModal();
	const store = useRegistrarStore();
	const { toastResponse } = useComposableToast();

	const { status, data: alumni } = await useLazyFetch<Alumni[]>(
		'/api/registrar/alumni',
		{
			method: 'GET',
		},
	);

	watch(alumni, (val) => {
		console.log(val);
		store.loadAlumni(alumni.value);
	});

	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'course', label: 'Course' },
		{ key: 'email', label: 'Email' },
		{ key: 'password', label: 'Password' },
		{ key: 'batch', label: 'Batch' },
		{ key: 'status', label: 'Status' },
		{ key: 'actions', label: '' },
	];

	const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb'];

	const selected = ref<Alumni[]>();
	async function handleDelete(uid: string) {
		const res = await store.deleteAlumni(uid);
		toastResponse(res);
	}

	const statusColors = computed(() => {
		return (status: any): any => {
			switch (status.toLowerCase()) {
				case 'unemployed':
					return 'yellow';
				case 'unknown':
					return 'red';
				case 'employed':
				default:
					return 'primary';
			}
		};
	});
</script>

<template>
	<Navbar>
		<div class="flex gap-2 items-center">
			<UButton
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				class="lg:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm"
			/>
			<label class="font-bold text-lg text-yellow-400">Alumni's</label>
		</div>
		<div class="flex items-center w-full justify-end gap-4">
			<!-- <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          :trailing="false"
          placeholder="Search..."
          v-model="q"
        /> -->
			<UButton
				icon="i-heroicons-pencil-square"
				size="sm"
				color="gray"
				variant="solid"
				label="Add Alumni"
				trailing
				@click="modal.open(RegistrarModalAdd)"
			/>
		</div>
	</Navbar>
	<SubNavbar>
		<div class="flex items-center gap-4 w-full">
			<!-- <USelectMenu multiple placeholder="Select Status" /> -->
			<USelectMenu
				:options="people"
				multiple
				placeholder="Location"
			/>
		</div>
		<USelectMenu
			:options="people"
			multiple
			placeholder="Display"
		/>
	</SubNavbar>
	<UTable
		:loading="status != 'success' ? true : false"
		:loading-state="{
			icon: 'i-heroicons-arrow-path-20-solid',
			label: 'Loading...',
		}"
		:empty-state="{
			icon: 'i-heroicons-circle-stack-20-solid',
			label: 'No items.',
		}"
		:rows="store.alumni"
		:columns="columns"
		:ui="{
			th: {
				base: 'sticky z-10 top-0 bg-gray-100',
			},
		}"
	>
		<template #id-data="{ index }">{{ index + 1 }}</template>
		<template #status-data="{ row }">
			<UBadge
				variant="subtle"
				:color="statusColors(row.status)"
				>{{ row.status }}</UBadge
			>
		</template>
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
								handleDelete(row.uid);
							},
						},
					],
				]"
			>
				<UButton
					color="gray"
					variant="ghost"
					icon="i-heroicons-ellipsis-horizontal-20-solid"
				/>
			</UDropdown>
		</template>
	</UTable>
</template>
