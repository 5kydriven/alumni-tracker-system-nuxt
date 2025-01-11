<script setup lang="ts">
	import {
		addDoc,
		collection,
		doc,
		getDoc,
		onSnapshot,
	} from 'firebase/firestore';

	const store = useChatStore();
	const db = useFirestore();
	const route = useRoute();
	const isLoading = ref(false);
	const { getUserCredentials } = useFirbaseUtils();

	const user = useCurrentUser();
	const message = ref('');

	const messages = ref([]);
	const messagesRef = collection(
		db,
		'conversations',
		route.params.uid.toString(),
		'messages',
	);

	const unscribe = onSnapshot(
		messagesRef,
		(querySnapshot) => {
			messages.value = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			}));
		},
		(error) => {
			console.error('Error listening to real-time updates:', error);
		},
	);

	const user2 = await getDoc(
		doc(db, 'conversations', route.params.uid.toString()),
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
		// store.storeMessage({ content: message.value, uid: user.value.uid });
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

	watch(messages, () => console.log(messages.value));

	watch(messages, async () => {
		await nextTick();
		scrollToBottom();
	});

	onMounted(() => {
		scrollToBottom();
	});
</script>

<template>
	<div class="w-full flex flex-col">
		<div class="h-16 p-4 flex items-center gap-2 w-full shrink-0">
			<UAvatar :alt="user2.data().name" />
			<label>{{ user2.data().name }}</label>
		</div>

		<div
			class="border-y border-gray-200 dark:border-gray-800 dark:text-gray-200 overflow-auto flex flex-col justify-end flex-1"
		>
			<div
				ref="messagesContainer"
				class="flex flex-col gap-2 overflow-auto h-auto px-4 py-2"
			>
				<MessageItem
					v-for="(item, index) in messages"
					v-bind="item"
					:currentUid="user.uid"
					:key="index"
				/>
				<div ref="scrollBottomRef"></div>
			</div>
		</div>

		<form
			@submit.prevent="handleSubmit"
			class="flex gap-2 p-4"
		>
			<UInput
				placeholder="Type a message"
				v-model="message"
				class="w-full"
				required
			/>
			<UButton
				:loading="isLoading"
				label="send"
				icon="i-heroicons-paper-airplane"
				type="submit"
			/>
		</form>
	</div>
</template>
