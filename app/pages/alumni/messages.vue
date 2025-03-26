<script setup lang="ts">
	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const router = useRouter();

	function handleClick(uid: string) {
		router.push(`/alumni/messages/${uid}`);
	}
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
		<div
			class="hidden border-r-none w-full border-gray-300 md:border-r bg-white dark:border-gray-800 shadow-lg lg:max-w-md md:flex flex-col">
			<div
				class="h-16 px-4 flex items-center border-b dark:border-gray-800 border-gray-200 bg-gray-300 shrink-0">
				<div class="flex gap-2 items-center">
					<label class="text-lg font-bold">Messages</label>
				</div>
			</div>

			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<NuxtPage />
	</div>
</template>
