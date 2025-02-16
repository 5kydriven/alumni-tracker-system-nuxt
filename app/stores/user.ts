export const useUserStore = defineStore('user-store', () => {
	const page = ref(1);
	const limit = ref(15);
	const selectedRole = ref(['registrar', 'employer']);

	return {
		page,
		limit,
		selectedRole,
	};
});
