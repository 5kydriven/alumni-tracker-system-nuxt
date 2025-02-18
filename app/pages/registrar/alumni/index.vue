<script setup lang="ts">
	import {
		RegistrarAlumniAdd,
		RegistrarAlumniDelete,
		RegistrarAlumniDeleteMultiple,
		RegistrarSlideOver,
		UButton,
	} from '#components';

	definePageMeta({
		middleware: ['personel'],
		layout: 'registrar',
	});

	const router = useRouter();
	const slideOver = useSlideover();
	const modal = useModal();
	const nuxtApp = useNuxtApp();

	const defaultColumns = [
		{ key: 'uid', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'course', label: 'Course' },
		{ key: 'email', label: 'Email' },
		{ key: 'password', label: 'Password' },
		{ key: 'batch', label: 'Batch' },
		{ key: 'status', label: 'Status' },
		{ key: 'actions', label: '' },
	];
	const courses = ['BSIT', 'BSCRIM', 'BSED', 'BSAB', 'BSHM', 'BEED'];
	const statuses = ['unknown', 'unemployed', 'employed'];

	const q = ref();
	const page = ref(1);
	const limit = ref(10);
	const selected = ref<Alumni[]>([]);
	const selectedColumns = ref(defaultColumns);
	const selectedCourses = ref<Course[]>([]);
	const selectedStatuses = ref<AlumniStatus[]>([]);

	const offset = computed(() => (page.value - 1) * limit.value);
	const filteredColumns = computed(() =>
		defaultColumns.filter((column) => column.key !== 'actions'),
	);
	const columns = computed(() =>
		defaultColumns.filter((column) => selectedColumns.value.includes(column)),
	);
	const query = computed(() => ({
		q: q.value,
		courses: selectedCourses.value,
		statuses: selectedStatuses.value,
		limit: limit.value,
		offset: offset.value,
	}));
	const statusColors = computed(() => {
		return (status: AlumniStatus): any => {
			switch (status) {
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

	const { status, data: alumni } = useLazyFetch<PaginatedResponse<Alumni[]>>(
		'/api/registrar/alumni',
		{
			key: 'alumni',
			method: 'GET',
			query,
			default: () => ({
				data: [],
				total: 0,
			}),
			getCachedData: (key) => {
				const cachedData =
					nuxtApp.payload.data[key] || nuxtApp.static.data[key];
				if (cachedData) {
					return cachedData;
				}
				return null;
			},
			watch: [q, page],
		},
	);

	function onClosed() {
		modal.close();
		selected.value = [];
	}
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
				size="sm" />
			<label class="font-bold text-lg hidden md:block">Alumni's</label>
		</div>
		<div class="flex items-center w-full justify-end gap-2 md:gap-4">
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
				trailing
				@click="modal.open(RegistrarAlumniAdd, { onClose: modal.close })">
				<span class="hidden md:block">Import Alumni</span>
			</UButton>
		</div>
	</Navbar>
	<SubNavbar>
		<div class="flex items-center py-4 gap-2 md:gap-4 w-full">
			<USelectMenu
				multiple
				v-model="selectedStatuses"
				placeholder="Select Status"
				:options="statuses" />
			<USelectMenu
				:options="courses"
				v-model="selectedCourses"
				multiple
				placeholder="Select Course" />
		</div>
		<div class="flex gap-2 items-center">
			<UButton
				icon="i-heroicons-trash-solid"
				label="Delete"
				color="red"
				@click="
					modal.open(RegistrarAlumniDeleteMultiple, {
						onClose: onClosed,
						selected: selected,
					})
				"
				v-show="selected.length > 0" />
			<USelectMenu
				v-model="selectedColumns"
				icon="i-heroicons-adjustments-horizontal-solid"
				:options="filteredColumns"
				class="md:flex hidden"
				multiple>
				<template #label> Display </template>
			</USelectMenu>
		</div>
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
		:rows="alumni.data || []"
		:columns="columns"
		v-model="selected"
		:ui="{
			th: {
				base: 'sticky z-10 top-0 bg-gray-100',
			},
			td: {
				padding: 'p-2',
			},
			wrapper: 'flex-1',
		}">
		<template #uid-data="{ row }">{{ row.uid }}</template>
		<template #name-data="{ row }"
			><span class="capitalize">{{ row.name }}</span></template
		>
		<template #course-data="{ row }">
			{{ row.userCredentials.course }}
		</template>
		<template #batch-data="{ row }">
			{{ row.userCredentials.batch }}
		</template>
		<template #status-data="{ row }">
			<UBadge
				variant="subtle"
				:color="statusColors(row.userCredentials.status)"
				>{{ row.userCredentials.status }}</UBadge
			>
		</template>
		<template #actions-data="{ row }">
			<UDropdown
				:items="[
					[
						{
							label: 'View',
							icon: 'i-heroicons-eye-solid',
							click: () => {
								router.push(`/registrar/alumni/${row.uid}`);
							},
						},
						{
							label: 'Delete',
							icon: 'i-heroicons-trash-solid',
							click: () => {
								modal.open(RegistrarAlumniDelete, {
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
	<div class="flex py-2 px-4 items-center border-t justify-between">
		<div>
			<span class="text-sm leading-5">
				Showing
				<span class="font-medium">{{ (page - 1) * limit + 1 }}</span>
				to
				<span class="font-medium">{{
					Math.min(page * limit, alumni.total as number)
				}}</span>
				of
				<span class="font-medium">{{ alumni && alumni.total }}</span>
				results
			</span>
		</div>
		<UPagination
			v-model="page"
			:page-count="10"
			:total="alumni.total as number"
			:to="(page: number) => ({
      query: { page },
    })" />
	</div>
</template>
