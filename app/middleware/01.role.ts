export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();

	if (!user) {
		return navigateTo('/auth');
	}

	const { data: role } = await useFetch('/api/role', {
		method: 'POST',
		body: JSON.stringify(user.uid),
	});
	const { data: alumni } = await useFetch<Alumni>(`/api/alumni/${user.uid}`);

	console.log(role.value);
	const path = `/${role.value}`;
	if (role) {
		if (role.value == 'alumni' && !alumni.value.isUpdated) {
			return navigateTo('/alumni/update-account');
		}
		return navigateTo(path.toString());
	}
});
