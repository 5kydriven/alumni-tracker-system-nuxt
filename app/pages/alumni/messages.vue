<script setup lang="ts">
	import { AlumniSlideOver } from '#components';

	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const router = useRouter();
	const route = useRoute();
	const slideOver = useSlideover();

	function handleClick(uid: string) {
		router.push(`/alumni/messages/${uid}`);
	}
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
		<div
			:class="route.path !== '/alumni/messages' ? 'md:flex hidden' : 'flex'"
			class="border-r-none w-full border-gray-300 md:border-r bg-white dark:border-gray-800 shadow-lg lg:max-w-md flex-col">
			<ConversationHeader
				class="py-4"
				@click="
					slideOver.open(AlumniSlideOver, { onClose: slideOver.close })
				" />

			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<NuxtPage />
	</div>
</template>
