<script setup lang="ts">
	import { onAuthStateChanged, type Auth } from 'firebase/auth';

	useSeoMeta({
		title: 'CPSU || Welcome',
		ogTitle: 'CPSU',
		description: 'Central Philippine State University',
		ogDescription: 'Central Philippine State University',
		ogImage: '/cpsu-banner.png',
		twitterCard: 'summary_large_image',
	});

	useHead({
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
		bodyAttrs: {
			class: 'dark:bg-gray-900 dark:text-gray-200 text-gray-900',
		},
		htmlAttrs: {
			lang: 'en',
		},
	});

	const router = useRouter();
	const auth = useFirebaseAuth();

	onMounted(() => {
		onAuthStateChanged(auth as Auth, async (user: any) => {
			if (!user) {
				return router.push('/auth');
			}
		});
	});
</script>

<template>
	<div>
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<USlideovers />
		<UModals />
		<UNotifications />
	</div>
</template>
