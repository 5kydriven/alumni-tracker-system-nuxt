<script setup lang="ts">
	import { PersonnelSlideOver } from '#components';
	definePageMeta({
		middleware: ['personnel'],
		layout: 'personnel',
	});

	const router = useRouter();
	const slideOver = useSlideover();
	const route = useRoute();

	function handleClick(uid: string) {
		router.push(`/personnel/messages/${uid}`);
	}
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
		<div
			:class="route.path !== '/personnel/messages' ? 'md:flex hidden' : 'flex'"
			class="border-r-none w-full border-gray-300 md:border-r bg-white dark:border-gray-800 shadow-lg lg:max-w-md flex-col">
			<ConversationHeader
				class="py-4"
				@click="
					slideOver.open(PersonnelSlideOver, { onClose: slideOver.close })
				"
				isShowButton />

			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<NuxtPage />
	</div>
</template>
