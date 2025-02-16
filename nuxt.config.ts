// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-01-07',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'nuxt-vuefire',
		'@nuxt/image',
		'nuxt-nodemailer',
		'@vite-pwa/nuxt',
	],
	colorMode: {
		preference: 'light',
	},
	future: {
		compatibilityVersion: 4,
	},
	pinia: {
		storesDirs: ['./app/stores/**'],
	},
	typescript: {
		typeCheck: true,
		strict: true,
	},
	runtimeConfig: {
		googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
		privateKey: process.env.NUXT_FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.NUXT_FIREBASE_CLIENT_EMAIL,
		public: {
			appUrl: 'https://cpsu-alumni-tracker.vercel.app',
		},
	},
	// routeRules: {
	// 	'/': { prerender: true },
	// },
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
	nodemailer: {
		from: 'Alumni Tracker <foobar@example.com>',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.NUXT_EMAIL,
			pass: process.env.NUXT_PASSWORD,
		},
	},
	tailwindcss: {
		config: {
			theme: {
				extend: {
					colors: {
						zuccini: {
							DEFAULT: '#04401f',
							50: '#edf7f0',
							100: '#d0eadb',
							200: '#a3d4b9',
							300: '#6dbd92',
							400: '#379f6b',
							500: '#04401f',
							600: '#03381b',
							700: '#032f16',
							800: '#022712',
							900: '#011b0c',
							950: '#00130a',
						},
						goldenfizz: {
							DEFAULT: '#f1f806',
							50: '#fafee8',
							100: '#f4ffc2',
							200: '#edff89',
							300: '#eaff45',
							400: '#ecfc13',
							500: '#f1f806',
							600: '#ccc202',
							700: '#a38d05',
							800: '#866e0d',
							900: '#725911',
							950: '#433105',
						},
					},
				},
			},
		},
	},
	css: ['@vuepic/vue-datepicker/dist/main.css'],
	build: {
		transpile: ['@vuepic/vue-datepicker'],
	},
});
