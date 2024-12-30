export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser();

	const { data: alumni } = await useFetch<Alumni>(`/api/alumni/${user.uid}`);

	if (alumni.value.isUpdated) {
		return navigateTo('/alumni/update-account');
	}
});
