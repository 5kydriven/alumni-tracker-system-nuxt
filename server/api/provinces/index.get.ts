import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const config = useRuntimeConfig();
	const provinces: any = await $fetch(
		`${config.public.psgcApi}/provinces.json`,
	);

	const transform = provinces.map((item: any) => ({
		name: item.name,
		code: item.code,
	}));

	transform.sort((a: any, b: any) => a.name.localeCompare(b.name));

	return transform;
});
