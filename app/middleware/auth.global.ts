import type { User } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;

	const user: User = await getCurrentUser();
	console.log('User: ', user.uid);
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

	// const { data } = await useAsyncData('role-middleware', async () => {
	// 	const [role, alumni] = await Promise.all([
	// 		$fetch('/api/role', {
	// 			method: 'POST',
	// 			body: JSON.stringify({ uid: user.uid }),
	// 		}),
	// 		$fetch<Alumni>(`/api/alumni/${user.uid}`),
	// 	]);
	// 	return { role, alumni };
	// });
	// const role = data.value.role;
	// const alumni = data.value.alumni;
	// console.log('role: ', data.value.role);

	// const path = `/${role}`;
	// if (role) {
	// 	if (role == 'alumni' && !alumni.isUpdated) {
	// 		return navigateTo('/alumni/update-account');
	// 	}
	// if(user != null && role != null) {
	// 	return navigateTo(`/${role}`);
	// }
});
