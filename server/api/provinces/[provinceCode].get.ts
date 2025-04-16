import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig();
	const uid = getRouterParam(event, 'provinceCode');

	const cities: any = await $fetch(
		`${config.public.psgcApi}/provinces/${uid}/cities.json`,
	);

	const transform = cities.map((item: any) => ({
		name: item.name,
		code: item.code,
	}));

	transform.sort((a: any, b: any) => a.name.localeCompare(b.name));

	return transform;
});
