import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	const sessionCookie = await getAuth().createSessionCookie(token, {
		expiresIn,
	});
	setCookie(event, 'sessionCookie', sessionCookie, {
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
	});
	return {
		statusCode: 200,
		message: 'Session cookie set',
	};
});
