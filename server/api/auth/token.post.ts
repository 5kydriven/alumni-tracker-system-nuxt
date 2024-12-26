import { getAuth } from 'firebase-admin/auth';

export default eventHandler(async (event) => {
	const { token } = await readBody(event);

	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	try {
		const sessionCookie = await getAuth().verifyIdToken(token);

		setCookie(event, 'sessionCookie', token, {
			maxAge: expiresIn,
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
		});

		return { statusCode: 200, body: { status: 'success' } };
	} catch (err) {
		console.log('auth', err);
	}
});
