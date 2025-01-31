export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();

	const cachedUserData = useState(`user-${user.uid}`, () => null);

	if (!cachedUserData.value) {
		const { data } = await $fetch<H3Response<any>>(`/api/user/${user.uid}`);
		cachedUserData.value = data;
	}

	const userData = cachedUserData.value;

	if (userData.role != 'alumni') {
		return showError({
			statusCode: 404,
			statusMessage: 'Page Not Found',
		});
	}

	if (userData.role == 'alumni' && userData.isUpdated == false) {
		return await navigateTo('/alumni/update-account');
	}
});
