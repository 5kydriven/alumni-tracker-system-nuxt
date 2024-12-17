export default defineEventHandler((event) => {
	setCookie(event, 'session', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 0,
	});

	return { success: true };
});
