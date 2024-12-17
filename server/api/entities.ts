import { getAuth } from 'firebase-admin/auth';

export default eventHandler(async (event) => {
	const auth = getAuth();
	auth.setCustomUserClaims('3kWVy65IGYcNpfujsFLe23LuCVS2', {
		role: 'employer',
	});
	return { status: 200, message: 'success' };
});
