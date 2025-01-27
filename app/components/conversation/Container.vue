<script setup lang="ts">
	import { collection, query, where } from 'firebase/firestore';

	const user = useCurrentUser();
	const db = useFirestore();
	const { conversations, fetchConversations, isLoading } = useConversation();

	const conversationsRef = collection(db, 'conversations');
	const q = query(
		conversationsRef,
		where('participants', 'array-contains', user.value.uid),
	);

	const unsubcribe = fetchConversations(user, q, db);

	onUnmounted(() => {
		unsubcribe();
		console.log('unsubscribed');
	});

	const emits = defineEmits(['itemClicked']);
</script>

<template>
	<template v-if="!isLoading && conversations.length > 0">
		<div class="flex flex-col h-full overflow-auto">
			<ConversationItem
				v-for="(conversation, index) in conversations"
				:key="index"
				@click="emits('itemClicked', conversation.id)"
				v-bind="conversation" />
		</div>
	</template>
	<template v-else>
		<div
			class="w-full h-full flex flex-col justify-center items-center"
			v-if="isLoading">
			<UIcon
				name="i-heroicons-arrow-path"
				class="w-10 h-10 dark:text-gray-700 text-black animate-spin" />
		</div>
		<div
			class="w-full h-full flex flex-col justify-center gap-2 items-center"
			v-else>
			<UIcon
				name="i-heroicons-inbox"
				class="w-14 h-14 dark:text-gray-700 text-gray-500" />
			<div class="dark:text-gray-700 text-black">You have no messages</div>
		</div>
	</template>
</template>
