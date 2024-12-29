export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();

	if (user && to.name == '/auth') {
		return await navigateTo('/');
	}

	const restrictedPaths = ['/admin', '/registrar', '/employer', '/alumni'];
	if (!user && restrictedPaths.includes(to.path)) {
		return navigateTo('/auth');
	}

	if (user) {
		return await navigateTo('/');
	}
});
