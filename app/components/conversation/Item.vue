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
			<label class="capitalize truncate w-64 text-black">
				{{ props.name }}
			</label>
			<div
				class="flex justify-between dark:text-gray-700 text-gray-400 text-sm">
				<p class="truncate line-clamp-1 w-52">
					<span
						v-show="props.isGroup"
						class="capitalize font-semibold"
						>{{ props.lastMessage.name }}: </span
					>{{ props.lastMessage.message }}
				</p>
				<span>
					{{ convertConversationTimestamp(props.lastMessage.createdAt) }}
				</span>
			</div>
		</div>
	</div>
</template>
