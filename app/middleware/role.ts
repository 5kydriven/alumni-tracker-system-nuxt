export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();

	if (!user) {
		return navigateTo('/auth');
	}

	const { data: role } = await useLazyFetch('/api/role', {
		method: 'POST',
		body: JSON.stringify(user.uid),
	});
	const path = `/${role.value}`;
	if (role) {
		return await navigateTo(path.toString());
	}
});
