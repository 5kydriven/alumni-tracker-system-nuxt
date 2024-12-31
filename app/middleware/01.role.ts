export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.client) return;
	const user = await getCurrentUser();

	if (!user) {
		return await navigateTo('/auth');
	}

	const role = await $fetch('/api/role', {
		method: 'POST',
		body: JSON.stringify({ uid: user.uid }),
	});
	const alumni = await $fetch<Alumni>(`/api/alumni/${user.uid}`);

	// const role = data.value.role;
	// const alumni = data.value.alumni;
	console.log('role: ', role);

	const path = `/${role}`;
	if (role != undefined) {
		if (role === 'alumni' && !alumni.isUpdated) {
			return await navigateTo('/alumni/update-account');
		}
		return await navigateTo(path.toString());
	}
});
