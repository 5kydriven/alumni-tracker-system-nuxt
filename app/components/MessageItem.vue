<script setup lang="ts">
	import type { Timestamp } from 'firebase/firestore';

	const { convertMessagesTimestamp } = useConverter();

	const props = defineProps<{
		currentUid?: string;
		senderUid?: string;
		message?: string;
		createdAt?: Timestamp;
		name?: string;
	}>();
</script>

<template>
	<div
		class="flex flex-col gap-1 max-w-md"
		:class="props.currentUid == props.senderUid ? 'self-end' : 'self-start'"
	>
		<div
			class="flex"
			:class="props.currentUid == props.senderUid ? 'justify-end' : 'gap-2'"
		>
			<UAvatar
				:alt="props.name"
				:class="props.currentUid == props.senderUid ? 'hidden' : ''"
			/>
			<p
				:class="
					props.currentUid == props.senderUid
						? 'bg-primary-500 text-white rounded-tr-none  rounded-lg'
						: 'bg-gray-300  rounded-tl-none rounded-lg'
				"
				class="px-2 py-1 text-wrap"
			>
				{{ props.message }}
			</p>
		</div>
		<span
			:class="props.currentUid == props.senderUid ? 'self-start' : 'self-end'"
			class="text-xs text-gray-500"
			>{{ convertMessagesTimestamp(props.createdAt) }}</span
		>
	</div>
</template>
