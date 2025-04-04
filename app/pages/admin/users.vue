<script setup lang="ts">
	import { AdminUserAdd, AdminSlideOver } from '#components';
	import { collection, getCountFromServer, query } from 'firebase/firestore';

	definePageMeta({
		middleware: ['admin'],
		layout: 'admin',
	});

	const { q } = useSearch();
	const modal = useModal();
	const slideOver = useSlideover();
	const route = useRoute();
	const store = useUserStore();
	const db = useFirestore();

	const isUser = computed(() => route.path == '/admin/users');

	const queueCount = ref(0);

	async function getQueueCount() {
		const queueCollection = collection(db, 'queues');
		const queueQuery = query(queueCollection);

		const snapshot = await getCountFromServer(queueQuery);
		queueCount.value = snapshot.data().count;
		console.log(queueCount.value);
	}

	const links = computed(() => [
		{
			label: 'Users',
			icon: 'i-heroicons-users',
			to: '/admin/users',
			exact: true,
		},
		{
			label: 'Approval Queue',
			icon: 'i-heroicons-chart-bar',
			to: '/admin/users/queue',
			badge: queueCount.value,
		},
	]);

	onMounted(() => {
		getQueueCount();
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
			<label class="font-bold text-xl text-black">User's</label>
		</div>
		<div class="flex items-center gap-4">
			<UInput
				v-if="isUser"
				icon="i-heroicons-magnifying-glass-20-solid"
				size="sm"
				color="white"
				:trailing="false"
				placeholder="Search..."
				v-model="q" />
			<UButton
				v-if="isUser"
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
		<UHorizontalNavigation
			:ui="{
				before:
					'before:rounded-none hover:before:bg-gray-300 before:inset-x-0 before:inset-y-2 before:rounded-md',
				after:
					'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
				active:
					'text-gray-900 dark:text-white after:bg-primary-500 border-none  after:rounded-full',
				inactive: 'text-gray-500  hover:text-gray-900 ',
			}"
			:links="links" />

		<USelectMenu
			v-if="isUser"
			v-model="store.selectedRole"
			:options="['employer', 'personnel']"
			multiple
			placeholder="Select Role" />
	</SubNavbar>
	<NuxtPage />
</template>
