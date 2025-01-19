<script setup lang="ts">
	import {
		collection,
		doc,
		getDoc,
		onSnapshot,
		orderBy,
		query,
	} from 'firebase/firestore';

	const db = useFirestore();
	const route = useRoute();
	const user = useCurrentUser();
	const { getParticipantName } = useConversation();
	const isLoading = ref(false);
	const message = ref('');
	const participant = ref();

	const messages = ref([]);
	const messagesRef = query(
		collection(db, 'conversations', route.params.uid.toString(), 'messages'),
		orderBy('createdAt', 'asc'),
	);

	const unsubscribe = onSnapshot(
		messagesRef,
		async (querySnapshot) => {
			participant.value = await getParticipantName(
				route.params.uid.toString(),
				db,
				user.value.uid,
			);
			messages.value = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			}));
		},
		(error) => {
			console.error('Error listening to real-time updates:', error);
		},
	);

	async function handleSubmit() {
		isLoading.value = true;
		const res = await $fetch(`/api/conversation/message/${route.params.uid}`, {
			method: 'POST',
			body: JSON.stringify({
				message: message.value,
				senderUid: user.value.uid,
				name: user.value.displayName,
			}),
		});
		message.value = '';
		isLoading.value = false;
		console.log(res);
	}

	const messagesContainer = ref(null);
	const scrollBottomRef = ref(null);
	function scrollToBottom() {
		if (messagesContainer.value) {
			messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
		}
	}

	watch(messages, async () => {
		await nextTick();
		scrollToBottom();
	});

	onMounted(() => {
		scrollToBottom();
	});

	onUnmounted(() => {
		unsubscribe();
	});
</script>

<template>
	<div class="w-full flex flex-col">
		<MessageHeader :participantName="participant" />

		<div
			class="border-y border-gray-200 dark:border-gray-800 dark:text-gray-200 overflow-auto bg-slate-100 flex flex-col justify-end flex-1">
			<div
				ref="messagesContainer"
				class="flex flex-col gap-2 overflow-auto h-auto px-4 py-2">
				<MessageItem
					v-for="(item, index) in messages"
					v-bind="item"
					:currentUid="user.uid"
					:key="index" />

				<div ref="scrollBottomRef"></div>
			</div>
		</div>

		<form
			@submit.prevent="handleSubmit"
			class="flex gap-2 p-4 bg-white border-t border-gray-300">
			<UInput
				placeholder="Type a message"
				v-model="message"
				class="w-full"
				required />
			<UButton
				:loading="isLoading"
				label="send"
				icon="i-heroicons-paper-airplane"
				type="submit" />
		</form>
	</div>
</template>
