export default defineNuxtRouteMiddleware(async (to, from) => {
	// const store = useAuthStore();
	// const { data: user } = await useLazyAsyncData(
	// 	'users',
	// 	async () => await store.getUser()
	// );
	// watch(user, () => {
	// 	console.log('Authenticated user:', user.value);
	// });
	// if (import.meta.server) return;
	// if (!user.value) {
	// 	console.log(user);
	// 	if (to.path === '/alumni' && !user.value) {
	// 		console.log(user.value);
	// 		// return navigateTo('/');
	// 	}
	// 	if (to.path === '/' && user.value) {
	// 		console.log('middleware', user.value);
	// 		// return navigateTo('/alumni');
	// 	}
	// }
	// const { getUser } = useAuth();
	// const user = await getUser();
	// if (!user && to.path === '/alumni') return navigateTo('/');
	// if (user && to.path === '/') return navigateTo('/alumni');
});
