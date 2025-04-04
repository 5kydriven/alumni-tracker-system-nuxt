export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.server) return;
	const user = await getCurrentUser();

	const cachedUserData = useState<any>(`user-${user.uid}`, () => null);

	if (!cachedUserData.value) {
		const { data } = await $fetch<H3Response<any>>(`/api/user/${user.uid}`);
		cachedUserData.value = data;
	}

	const userData = cachedUserData.value;

	if (userData.role != 'personnel' && to.path == '/personnel') {
		return showError({
			statusCode: 404,
			statusMessage: 'Page Not Found',
		});
	}
});
