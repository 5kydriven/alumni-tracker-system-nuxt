import type { User } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
	// if (import.meta.client) return;
	const user: User = await getCurrentUser();

	if (!user) {
		return await navigateTo('/auth', { replace: true });
	}

	const role = await $fetch('/api/role', {
		method: 'POST',
		body: JSON.stringify({ uid: user.uid }),
	});

	const path = `/${role}`;
	if (role != undefined) {
		const alumni = await $fetch<Alumni>(`/api/alumni/${user.uid}`);
		if (role === 'alumni' && !alumni.isUpdated) {
			return await navigateTo('/alumni/update-account', { replace: true });
		}
		return await navigateTo(path.toString(), { replace: true });
	}
});
