export default function useUtils() {
	async function getRole() {
		const user = await getCurrentUser();
		const { data: role } = await useLazyFetch('/api/role', {
			method: 'POST',
			body: JSON.stringify({ uid: user.uid }),
		});
		return role.value;
	}

	return {
		getRole,
	};
}
