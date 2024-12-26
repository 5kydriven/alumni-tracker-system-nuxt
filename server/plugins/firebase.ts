import initFirebase from '../utils/initFirebase';

export default defineNitroPlugin((nuxtapp) => {
	const config = useRuntimeConfig();
	const firebaseConfig = {
		project_id: config.projectId,
		private_key: config.privateKey.replace(/\\n/g, '\n'),
		client_email: config.clientEmail,
	};
	initFirebase(firebaseConfig);
});
