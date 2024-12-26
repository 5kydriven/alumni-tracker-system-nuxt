import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
	try {
		const sessionCookie = getCookie(event, 'sessionCookie');
		const user = await getAuth().verifySessionCookie(sessionCookie ?? '', true);
		return user;
	} catch (err) {
		return {
			statusCode: 401,
			message: 'User not logged in',
		};
	}
});
