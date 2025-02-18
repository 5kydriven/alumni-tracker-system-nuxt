<script setup lang="ts">
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
		// bodyAttrs: {
		// 	class: 'dark:bg-gray-900 dark:text-gray-200 text-gray-900',
		// },
		htmlAttrs: {
			lang: 'en',
			class: 'light',
		},
	});

	const router = useRouter();
	const user = useCurrentUser();
	// const toast = useToast();

	watch(user, async (currentUser, prevUser) => {
		if (prevUser && !currentUser) {
			return router.replace('/auth');
		}
	});

	// const { $pwa } = useNuxtApp();

	// onMounted(() => {
	// 	if ($pwa?.isPWAInstalled) toast.add({ title: 'PWA is installed' });
	// });
</script>

<template>
	<div>
		<!-- <NuxtPwaManifest /> -->
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<USlideovers />
		<UModals />
		<UNotifications />
	</div>
</template>

<style>
	::selection {
		background-color: yellow;
		color: #000;
	}
</style>
