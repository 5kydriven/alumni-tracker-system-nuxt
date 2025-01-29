export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;

	const user = await getCurrentUser();
	const { data } = await $fetch<H3Response<User<Alumni>>>(
		`/api/user/${user.uid}`,
		{
			method: 'GET',
		},
	);

	if (!user && !data.role) {
		return await navigateTo('/auth');
	}

	if (to.path != `/${data.role}`) {
		return await navigateTo(`/${data.role}`);
	}
});
