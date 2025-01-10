<script setup lang="ts"></script>

<template>
	<div class="h-16 p-4 flex items-center gap-2 w-full shrink-0">
		<UAvatar
			src="https://avatars.githubusercontent.com/u/739984?v=4"
			alt="Avatar"
		/>
		<label>John Doe</label>
	</div>

	<div
		class="border-y border-gray-200 dark:border-gray-800 dark:text-gray-200 overflow-auto flex flex-col justify-end flex-1"
	>
		<div
			ref="messagesContainer"
			class="flex flex-col gap-2 overflow-auto h-auto px-4 py-2"
		>
			<!-- <MessageItem
					v-for="(item, index) in messages"
					v-bind="item"
					:currentUid="user.uid"
					:key="index"
				/> -->
			<div ref="scrollBottomRef"></div>
		</div>
	</div>
</template>
