import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';

export default function useAuth() {
	const isLoading = useState('auth-loading', () => false);
	const router = useRouter();
	const error = useState('auth-error', () => null);

	async function handleLogin(auth: Auth, email: string, password: string) {
		isLoading.value = true;
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			// router.replace('/');
		} catch (err) {
			console.error('Error during login:', err);
			error.value = 'Incorrect email or password!';
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
