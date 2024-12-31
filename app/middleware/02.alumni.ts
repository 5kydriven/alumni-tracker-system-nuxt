export default defineNuxtRouteMiddleware(async (to, from) => {
	const { data } = useAsyncData('alumni-isUpdated', async () => {
		const user = await getCurrentUser();
		const alumni = await $fetch<Alumni>(`/api/alumni/${user.uid}`);
		return { alumni };
	});
	console.log(data.value.alumni.isUpdated);
	if (data.value.alumni.isUpdated) {
		return navigateTo('/alumni/update-account');
	}
});
