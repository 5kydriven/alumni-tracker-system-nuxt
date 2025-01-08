// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-01-07',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt', 'nuxt-vuefire'],
	colorMode: {
		preference: 'dark',
	},
	// devServer: {
	// 	port: 3005,
	// },
	future: {
		compatibilityVersion: 4,
	},
	ssr: true,
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
	runtimeConfig: {
		googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
		privateKey: process.env.NUXT_FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.NUXT_FIREBASE_CLIENT_EMAIL,
		public: {},
	},
	routeRules: {
		'/': { prerender: true },
		// '/auth': { ssr: false },
	},
	vuefire: {
		// appCheck: {
		// 	provider: 'ReCaptchaV3',
		// 	key: '6LdGpqoqAAAAAMZQKJSSqO758Ha0jQMNb28FO3zK',
		// 	isTokenAutoRefreshEnabled: true,
		// },
		auth: {
			enabled: true,
			sessionCookie: true,
		},
		config: {
			apiKey: 'AIzaSyCsx9rCdcIsbQZf3GEcnrspdRCC7IjDa3Y',
			authDomain: 'alumni-tracker-d7448.firebaseapp.com',
			projectId: 'alumni-tracker-d7448',
			storageBucket: 'alumni-tracker-d7448.firebasestorage.app',
			messagingSenderId: '970820206424',
			appId: '1:970820206424:web:f19ab209528edbf7b5ef2d',
		},
	},
});
