import type { User } from '~~/types/user';

export const useAdminStore = defineStore('adminStore', () => {
	// State
	const page = ref(1);
	const pageCount = 13;
	const users = ref<User[]>([]);
	const isLoading = ref(false);

	// Getters
	const rows = computed(() => {
		return users.value.slice(
			(page.value - 1) * pageCount,
			page.value * pageCount
		);
	});

	//Actions
	async function getUsers() {
		try {
			const res = await $fetch('/api/admin/user');
			users.value = res.map((user: User, index: number) => ({
				...user,
				id: index + 1,
			}));
		} catch (err) {
			console.log(err);
		}
	}

	async function createUser(data: User) {
		isLoading.value = true;

		const res = await $fetch('/api/admin/user', {
			method: 'POST',
			body: data,
		});
		users.value.push(data);

		isLoading.value = false;

		return res;
	}

	async function deleteUser(uid: string) {
		isLoading.value = true;

		const res = await $fetch('/api/admin/user', {
			method: 'DELETE',
			body: { uid },
		});
		users.value = users.value.filter((item) => item.uid !== uid);

		isLoading.value = false;

		return res;
	}

	async function logout() {
		await $fetch('/api/logout');
	}

	return {
		users,
		page,
		pageCount,
		isLoading,
		rows,
		createUser,
		getUsers,
		deleteUser,
	};
});
