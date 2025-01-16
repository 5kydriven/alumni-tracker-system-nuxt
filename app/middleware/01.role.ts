import type { User } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;
	const user: User = await getCurrentUser();

	if (!user) {
		return await navigateTo('/auth', { replace: true });
	}

	const role = await $fetch(`/api/role/${user.uid}`);

	const path = `/${role}`;

	if (role === 'alumni') {
		const alumni = await $fetch<Alumni>(`/api/alumni/${user.uid}`);
		if (!alumni.isUpdated) {
			return await navigateTo('/alumni/update-account', { replace: true });
		}
	}

	return await navigateTo(path.toString(), { replace: true });
});
