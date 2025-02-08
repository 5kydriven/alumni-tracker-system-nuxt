export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) return;

	const user = await getCurrentUser();

	const restrictedPaths = ['/alumni', '/admin', '/registrar', '/employer'];
	const isRestricted = restrictedPaths.some((path) => to.path.startsWith(path));

	if (!user && isRestricted) {
		return navigateTo('/auth');
	}

	// if (!user && to.path.startsWith('/auth/signup')) {
	// 	console.log('Allowing access to signup page');
	// 	return;
	// }

	if (user && to.path.startsWith('/auth') && to.path !== '/auth/signup') {
		return navigateTo('/');
	}

	console.log('Middleware executed', { path: to.path });
});
