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
			page.value * pageCount,
		);
	});

	//Actions
	async function getUsers() {
		try {
			const res = await $fetch('/api/admin/user');
			users.value = res.map((user: User) => user);
		} catch (err) {
			console.log(err);
		}
	}

	async function createUser(data: User) {
		isLoading.value = true;
		try {
			const res = await $fetch<H3Response>('/api/admin/user', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			if (res.statusCode === 200) {
				users.value.push(res.data);
			}
			return res;
		} catch (err) {
			console.log(err);
		} finally {
			await refreshNuxtData();
			isLoading.value = false;
		}
	}

	async function deleteUser(uid: string) {
		isLoading.value = true;

		const res = await $fetch<H3Response>(`/api/admin/${uid}`, {
			method: 'DELETE',
		});
		users.value = users.value.filter((item) => item.uid !== uid);

		isLoading.value = false;

		return res;
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
