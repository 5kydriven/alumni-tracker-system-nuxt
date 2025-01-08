export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;

	const user = await getCurrentUser();

	console.log('To Path:', to.path);

	const paths = ['/admin', '/registrar', '/employer', '/alumni'];
	if (!user && paths.includes(to.path)) {
		console.log('Redirecting to /auth');
		return await navigateTo('/auth');
	}

	if (user && to.path == '/auth') {
		return await navigateTo('/');
	}

	// if (user && paths.includes(from.path)) {
	// 	console.log('Redirecting back to:', from.path);
	// 	return navigateTo(from.path);
	// }

	// if (user != null && from.path == '/auth') {
	// 	return navigateTo('/');
	// }
});
