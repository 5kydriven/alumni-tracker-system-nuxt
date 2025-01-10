<script setup lang="ts">
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

	const user = useCurrentUser();
	const router = useRouter();

	watch(user, async (currentUser, prevUser) => {
		if (prevUser && !currentUser) {
			return router.push('/auth');
		}
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
