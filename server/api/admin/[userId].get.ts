export default defineEventHandler((event) => {
	const id = getRouterParam(event, 'userId');
	return { id };
});
