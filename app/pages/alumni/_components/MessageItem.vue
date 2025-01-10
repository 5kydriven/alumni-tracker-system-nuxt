<script setup lang="ts">
	const props = defineProps<{
		currentUid?: string;
		senderUid?: string;
		message?: string;
		createdAt?: any;
		name?: string;
	}>();
</script>

<template>
	<div
		class="flex flex-col gap-1 h-14"
		:class="props.currentUid == props.senderUid ? 'self-end' : 'self-start'"
	>
		<div
			class="flex"
			:class="props.currentUid == props.senderUid ? 'justify-end' : 'gap-2'"
		>
			<UAvatar
				alt="test"
				:class="props.currentUid == props.senderUid ? 'hidden' : ''"
			/>
			<p
				:class="
					props.currentUid == props.senderUid
						? 'bg-gray-400 dark:bg-primary-800 rounded-tr-none  rounded-lg'
						: 'bg-primary-400 dark:bg-gray-800  rounded-tl-none rounded-lg'
				"
				class="px-2 py-1 text-wrap"
			>
				{{ props.message }}
			</p>
		</div>
		<span
			:class="props.currentUid == props.senderUid ? 'self-start' : 'self-end'"
			class="text-xs text-gray-500"
			>07:40 AM</span
		>
	</div>
</template>
