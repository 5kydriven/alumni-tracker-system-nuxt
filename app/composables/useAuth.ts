import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getIdToken,
} from 'firebase/auth';
import type { Response } from '~~/types/response';

function useUser() {
	const errorBag = useState('errorBag', () => ({
		email: '',
		password: '',
		name: '',
	}));

	const user = useState('user', () => null);

	return {
		errorBag,
		user,
	};
}

function setTokenOnServer(token) {
	$fetch('/api/session', {
		method: 'POST',
		body: {
			token,
		},
	}).then((res) => {
		signOut(getAuth()).then((res) => {
			// navigate somewhere
			navigateTo('/alumni');
		});
	});
}

function login({ email, password }) {
	const { user, errorBag } = useUser();
	const auth = getAuth();
	setPersistence(auth, inMemoryPersistence).then(() => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCreds) => {
				user.value = userCreds.user;
				getIdToken(userCreds.user)
					.then((token) => {
						setTokenOnServer(token);
					})
					.catch((error) => {
						console.log('error', error);
					});
			})
			.catch((error) => {
				if (error.code === 'auth/invalid-credential') {
					errorBag.value.email = 'No user with this email';
				} else if (error.code === 'auth/wrong-password') {
					errorBag.value.email = 'Wrong credentials';
				}
			});
	});
}

async function getUser() {
	const { user } = useUser();
	const data = await $fetch<Response>('/api/user');
	if (data?.statusCode == 401) return false;

	user.value = data;
	return data;
}

export default function useAuth() {
	const { user, errorBag } = useUser();

	return {
		user,
		login,
		errorBag,
		getUser,
	};
}
