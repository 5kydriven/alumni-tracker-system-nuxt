export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;

	const user = await getCurrentUser();

	console.log('To Path:', to.path);

	if (!user && to.path != '/auth') {
		return await navigateTo('/auth');
	}

	if (user && to.path == '/auth') {
		return await navigateTo('/');
	}

	if (user && from.path != '/auth') {
		const { data } = await $fetch<H3Response<Alumni>>(`/api/user/${user.uid}`, {
			method: 'GET',
		});

		if (user && to.path != `/${data.role}`) {
			return await navigateTo(`/${data.role}`);
		}
	}
});
