<script setup lang="ts">
	import { collection, onSnapshot, query, where } from 'firebase/firestore';

	const router = useRouter();
	const user = useCurrentUser();
	const db = useFirestore();
	const { convertConversationTimestamp } = useConverter();
	const conversations = ref([]);

	const conversationsRef = collection(db, 'conversations');
	const q = query(
		conversationsRef,
		where('participants', 'array-contains', user.value.uid),
	);

	const unsubcribe = onSnapshot(q, (querySnapshot) => {
		const snapshot = [];
		querySnapshot.forEach((doc) => {
			snapshot.push({ ...doc.data(), id: doc.id });
		});
		conversations.value = snapshot;
	});

	function handleClick(uid?: string) {
		router.push(`/alumni/messages/${uid}`);
	}
</script>
<template>
	<div
		v-for="(conversation, index) in conversations"
		:key="index"
		class="flex flex-col border-t-none h-full border-gray-200 overflow-auto dark:border-gray-800 xl:h-[calc(100vh-73px)]"
	>
		<div
			class="p-4 dark:border-gray-800 border-b cursor-pointer"
			@click="handleClick(conversation.id)"
		>
			<div class="flex justify-between text-gray-500">
				<label class="capitalize">{{ conversation.name }}</label>
				<span>{{
					convertConversationTimestamp(conversation.lastMessage.createdAt)
				}}</span>
			</div>
			<p class="dark:text-gray-700 text-gray-700 truncate line-clamp-1 text-sm">
				{{ conversation.lastMessage.message }}
			</p>
		</div>
	</div>
</template>
