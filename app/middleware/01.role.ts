export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.client) return;
	const user = useCurrentUser();

	if (!user) {
		return await navigateTo('/auth');
	}

	const { data } = await useAsyncData('role-middleware', async () => {
		const [role, alumni] = await Promise.all([
			$fetch('/api/role', {
				method: 'POST',
				body: JSON.stringify({ uid: user.value.uid }),
			}),
			$fetch<Alumni>(`/api/alumni/${user.value.uid}`),
		]);
		return { role, alumni };
	});

	const role = data.value.role;
	const alumni = data.value.alumni;
	console.log('role: ', role);

	const path = `/${role}`;
	if (role != undefined) {
		if (role === 'alumni' && !alumni.isUpdated) {
			return await navigateTo('/alumni/update-account');
		}
		return await navigateTo(path.toString());
	}
});
