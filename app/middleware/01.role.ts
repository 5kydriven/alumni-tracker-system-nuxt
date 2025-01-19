export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;
	const user = await getCurrentUser();

	// if (!user) {
	// 	return await navigateTo('/auth', { replace: true });
	// }

	const response = await $fetch<H3Response<User<Alumni>>>(
		`/api/user/${user.uid}`,
		{
			method: 'GET',
		},
	);

	const path = `/${response?.data?.role}`;
	console.log(!response?.data?.userCredentials?.isUpdated);
	if (response?.data?.role === 'alumni') {
		if (!response?.data?.userCredentials?.isUpdated) {
			return await navigateTo('/alumni/update-account', { replace: true });
		}
	}

	return await navigateTo(path.toString(), { replace: true });
});
