// import initFirebase from '../utils/initFirebase';

export default defineNitroPlugin((nuxtapp) => {
	const config = useRuntimeConfig();

	const firebaseConfig = JSON.parse(
		config.googleApplicationCredentials as string,
	);

	if (firebaseConfig.private_key) {
		firebaseConfig.private_key = firebaseConfig.private_key.replace(
			/\\n/g,
			'\n',
		);
	}

	initFirebase(firebaseConfig);
});
