export default defineNuxtRouteMiddleware(async (to, from) => {
	const store = useAuthStore();
	const user = await getCurrentUser();

	// console.log('middleware', store.userCredential);
	console.log('middleware', user);

	if (!user) {
		return await navigateTo('/auth');
	}

	console.log('middleware', user.uid);

	const { data: role } = await useFetch('/api/role', {
		method: 'POST',
		body: { uid: user.uid },
	});

	if (user && role.value == 'admin') {
		return await navigateTo('/admin');
	}

	if (user && role.value == 'registrar') {
		return await navigateTo('/registrar');
	}

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
