import type { DecodedIdToken } from 'firebase-admin/auth';
import { getIdToken, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { Auth, UserCredential } from 'firebase/auth';

export const useAuthStore = defineStore('authStore', () => {
	// State
	const userCredential = ref<UserCredential>(null);
	const error = ref(null);
	const loading = ref(false);
	const isAuthenticated = ref(false);
	const router = useRouter();

	// actions
	async function login(auth: Auth, email: string, password: string) {
		loading.value = true;
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			router.replace('/');
		} catch (err) {
			console.error('Error during login:', err);
			error.value = 'Incorrect email or password!';
		} finally {
			loading.value = false;
		}
	}

	return {
		userCredential,
		loading,
		error,
		isAuthenticated,
		login,
	};
});
