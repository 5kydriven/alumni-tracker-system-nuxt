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

	const { data } = await $fetch<H3Response<User<Alumni>>>(
		`/api/user/${user.uid}`,
		{
			method: 'GET',
		},
	);

	if (user && to.path != `/${data.role}`) {
		return await navigateTo(`/${data.role}`);
	}

	// if (user && paths.includes(from.path)) {
	// 	console.log('Redirecting back to:', from.path);
	// 	return navigateTo(from.path);
	// }

	// if (user != null && from.path == '/auth') {
	// 	return navigateTo('/');
	// }
});
