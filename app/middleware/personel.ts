export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();
	const { data } = await $fetch<H3Response<any>>(`/api/user/${user.uid}`);

	if (data.role != 'registrar') {
		return showError({
			statusCode: 404,
			statusMessage: 'Page Not Found',
		});
	}
});
