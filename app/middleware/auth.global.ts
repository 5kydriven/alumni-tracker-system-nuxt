export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;

	const user = await getCurrentUser();

	const restrictedPaths = ['/alumni', '/admin', '/registrar', 'employer'];
	const isRestricted = restrictedPaths.some((path) => to.path.startsWith(path));
	if (!user && isRestricted) {
		return await navigateTo('/auth');
	}

	if (user && to.path == '/auth') {
		return await navigateTo('/');
	}
});
