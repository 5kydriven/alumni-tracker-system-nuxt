import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';

export default function useAuth() {
	const isLoading = useState('auth-loading', () => false);
	const router = useRouter();
	const error = useState<string | undefined>('auth-error', () => undefined);

	async function handleLogin(auth: Auth, email: string, password: string) {
		isLoading.value = true;
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const { data } = await $fetch<H3Response<any>>(
				`/api/user/${userCredential.user.uid}`,
			);
			error.value = '';
			return router.replace(`/${data.role}`);
		} catch (err: any) {
			console.error('Error during login:', err);
			switch (err.code) {
				case 'auth/invalid-credential':
					error.value = 'Incorrect email or password. Please try again.';
					break;
				// case 'auth/user-disabled':
				// 	error.value = 'Incorrect password. Please try again.';
				// 	break;
				case 'auth/network-request-failed':
					error.value = 'Please check your internet connection';
					break;
				default:
					error.value = 'An error occurred. Please try again later.';
			}
		} finally {
			isLoading.value = false;
		}
	}
	return {
		isLoading,
		error,
		handleLogin,
	};
}
