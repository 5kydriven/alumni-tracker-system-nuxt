<script setup lang="ts">
	import { RegistrarSlideOver } from '#components';
	definePageMeta({
		middleware: ['personel'],
		layout: 'registrar',
	});

	const router = useRouter();
	const slideOver = useSlideover();

	function handleClick(uid: string) {
		router.push(`/registrar/messages/${uid}`);
	}
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
		<div
			class="border-r-none w-full border-gray-300 md:border-r bg-white dark:border-gray-800 shadow-lg lg:max-w-md flex flex-col">
			<ConversationHeader
				class="py-4"
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				isShowButton />

			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<NuxtPage />
	</div>
</template>
