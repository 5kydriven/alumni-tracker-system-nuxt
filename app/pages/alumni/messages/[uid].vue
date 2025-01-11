<script setup lang="ts">
	definePageMeta({
		layout: 'user',
	});
</script>

<template>
	<div
		class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800"
	>
		<div
			class="border-r-none w-full border-gray-200 lg:border-r dark:border-gray-800 lg:max-w-md hidden lg:flex flex-col"
		>
			<div
				class="h-16 px-4 lg:flex items-center border-b dark:border-gray-800 border-gray-200 hidden shrink-0"
			>
				<div class="flex gap-2 items-center">
					<label>Messages</label>
					<!-- <UBadge
						label="20"
						variant="subtle"
					/> -->
				</div>
			</div>

			<ConversationItem />
		</div>

		<InboxMessage />
		<!-- <InboxDefaultMessage v-else /> -->
	</div>
</template>
