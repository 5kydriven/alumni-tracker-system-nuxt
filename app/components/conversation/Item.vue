<script setup lang="ts">
	const { convertConversationTimestamp } = useConverter();

	const props = defineProps<{
		name?: Conversations['name'];
		lastMessage?: Conversations['lastMessage'];
		isGroup?: Conversations['isGroup'];
	}>();
</script>

<template>
	<div
		class="p-4 dark:border-gray-800 border-b cursor-pointer flex gap-2 items-center">
		<UAvatar :alt="props.name" />
		<div class="flex flex-col w-full">
			<label class="capitalize truncate line-clamp-1 w-64 text-black z-0">
				{{ props.name }}
			</label>
			<div
				class="flex justify-between dark:text-gray-700 gap-2 text-gray-400 text-sm">
				<p class="text-ellipsis line-clamp-1 w-full overflow-hidden">
					<span
						v-show="props.isGroup"
						class="capitalize font-semibold"
						>{{ props.lastMessage.name }}: </span
					>{{ props.lastMessage.message }}
				</p>
				<span class="w-[85px]">
					{{ convertConversationTimestamp(props.lastMessage.createdAt) }}
				</span>
			</div>
		</div>
	</div>
</template>
