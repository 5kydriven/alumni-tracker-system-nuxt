export default defineNuxtRouteMiddleware((to, from) => {
	const user = useCurrentUser();

	if (!user) {
		return navigateTo('/auth');
	}

	console.log(user.value);
	const restrictedPaths = ['/admin', '/registrar', '/employer', '/alumni'];
	if (!user && restrictedPaths.includes(to.path)) {
		return navigateTo('/auth');
	}

	// if (user) {
	// 	return await navigateTo('/');
	// }
});
