export default defineEventHandler((event) => {
	const id = getRouterParam(event, 'uid');
	return { id };
});
