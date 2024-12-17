// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt'],
	colorMode: {
		preference: 'dark',
	},
	devServer: {
		port: 3005,
	},
	future: {
		compatibilityVersion: 4,
	},
	ssr: true,
	// routeRules: {
	// 	// Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
	// 	'/': { prerender: true },
	// },
	components: [
		//making every page has dedicated component so navigating them isn't hard
		{ path: '~/pages/admin/_components' },
		{ path: '~/pages/registrar/_components' },
		{ path: '~/pages/employer/_components' },
		{ path: '~/pages/alumni/_components' },
		'~/components',
	],
	pinia: {
		storesDirs: ['./app/stores/**'],
	},
	typescript: {
		typeCheck: true,
		strict: false,
	},
});
