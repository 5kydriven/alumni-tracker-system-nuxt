<script setup lang="ts">
	definePageMeta({
		layout: 'registrar',
	});

	const router = useRouter();

	function handleClick(uid: string) {
		router.push(`/registrar/messages/${uid}`);
	}
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800"
	>
		<div
			class="border-r-none w-full border-gray-200 lg:border-r dark:border-gray-800 lg:max-w-sm flex flex-col"
		>
			<div
				class="h-16 px-4 flex items-center border-b dark:border-gray-800 border-gray-200 shrink-0"
			>
				<div class="flex gap-2 items-center">
					<label class="text-lg font-bold">Messages</label>
				</div>
			</div>
			<RegistrarConversationItem @itemClicked="handleClick" />
		</div>
		<RegistrarMessage />
	</div>
</template>
