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

	if (user && data.role) {
		return await navigateTo(`/${data.role}`);
	}

	// const response = await $fetch<H3Response<User<Alumni>>>(
	// 	`/api/user/${user.uid}`,
	// 	{
	// 		method: 'GET',
	// 	},
	// );

	// const path = `/${response?.data?.role}`;
	// console.log(!response?.data?.userCredentials?.isUpdated);
	// if (response?.data?.role === 'alumni') {
	// 	if (!response?.data?.userCredentials?.isUpdated) {
	// 		return await navigateTo('/alumni/update-account', { replace: true });
	// 	}
	// }

	// return await navigateTo(path.toString(), { replace: true });
});
