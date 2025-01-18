import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { idToken } = body;
	if (!idToken) {
		throw createError({
			statusCode: 400,
			statusMessage: 'unauthorized',
		});
	}

	try {
		const expiresIn = 60 * 60 * 24 * 5 * 1000;

		const sessionCookie = await getAuth().createSessionCookie(idToken, {
			expiresIn,
		});

		setCookie(event, 'session', sessionCookie, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: expiresIn / 1000,
		});

		return { success: true };
	} catch (error) {
		console.error('Session creation failed:', error);
		throw createError({ statusCode: 401, statusMessage: 'unauthorized' });
	}
});
