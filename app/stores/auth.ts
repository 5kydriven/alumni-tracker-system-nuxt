import type { DecodedIdToken } from 'firebase-admin/auth';
import {
	browserLocalPersistence,
	getIdToken,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

export const useAuthStore = defineStore('authStore', () => {
	// State
	const user = ref(null);
	const isAuthenticated = ref(false);

	// Getters

	// actions
	async function login(auth: Auth, email: string, password: string) {
		try {
			await setPersistence(auth, browserLocalPersistence);

			const credentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const token = await getIdToken(credentials.user);

			const res = await $fetch('/api/auth', {
				method: 'POST',
				body: { token },
			});
			user.value = credentials.user;
			isAuthenticated.value = true;
			if (res.statusCode == 200) {
				await navigateTo('/alumni');
			}
		} catch (err) {
			console.error('Error during login:', err);
		}
	}

	async function getUser() {
		return await $fetch('/api/user');
	}

	return {
		user,
		isAuthenticated,
		login,
		getUser,
	};
});
