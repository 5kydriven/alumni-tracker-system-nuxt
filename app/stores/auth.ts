import type { DecodedIdToken } from 'firebase-admin/auth';
import { getIdToken, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

export const useAuthStore = defineStore('authStore', () => {
	// State
	const userCredential = ref<UserCredential>(null);
	const error = ref(null);
	const loading = ref(false);
	const isAuthenticated = ref(false);

	// Getters

	// actions
	async function login(auth: Auth, email: string, password: string) {
		loading.value = true;
		try {
			// await setPersistence(auth, browserLocalPersistence);

			userCredential.value = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			error.value = null;
			// const token = await getIdToken(userCredential.value.user);

			// const res = await $fetch('/api/auth', {
			// 	method: 'POST',
			// 	body: { token },
			// });
			// user.value = credentials.user;
			// isAuthenticated.value = true;
			// if (res.statusCode == 200) {

			await navigateTo('/');
		} catch (err) {
			console.error('Error during login:', err);
			error.value = 'Incorrect email or password!';
		} finally {
			loading.value = false;
		}
	}

	async function getUser() {
		return await $fetch('/api/user');
	}

	return {
		userCredential,
		loading,
		error,
		isAuthenticated,
		login,
		getUser,
	};
});
