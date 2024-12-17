export default defineEventHandler((event) => {
	deleteCookie(event, 'sessionCookie');
	return {
		statusCode: 200,
		message: 'User Logout',
	};
});
