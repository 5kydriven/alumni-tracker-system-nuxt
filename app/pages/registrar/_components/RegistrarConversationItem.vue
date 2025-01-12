<script setup lang="ts">
	import {
		collection,
		onSnapshot,
		query,
		where,
		doc,
		getDoc,
	} from 'firebase/firestore';
	import { ref, onUnmounted } from 'vue';

	const user = useCurrentUser();
	const db = useFirestore();
	const { convertConversationTimestamp } = useConverter();
	const conversations = ref(null);

	const participantsMap = ref({});

	const getParticipantNames = async (uids: string[]) => {
		for (const uid of uids) {
			if (uid !== user.value.uid) {
				const userDoc = await getDoc(doc(db, 'users', uid));
				if (userDoc.exists()) {
					participantsMap.value[uid] = userDoc.data().name;
				}
			}
		}
	};

	const conversationsRef = collection(db, 'conversations');
	const q = query(
		conversationsRef,
		where('participants', 'array-contains', user.value.uid),
	);

	const unsubcribe = onSnapshot(q, async (querySnapshot) => {
		const snapshot = [];
		for (const docSnap of querySnapshot.docs) {
			const conversation = docSnap.data();
			const participants = conversation.participants.filter(
				(uid: string) => uid !== user.value.uid,
			);

			await getParticipantNames(participants);

			snapshot.push({
				...conversation,
				id: docSnap.id,
				participants: participants.map(
					(uid: string) => participantsMap.value[uid] || 'Unknown',
				),
			});
		}
		conversations.value = snapshot;
	});

	const emits = defineEmits(['itemClicked']);

	onUnmounted(() => {
		unsubcribe();
	});
</script>

<template>
	<template v-if="conversations">
		<div
			v-for="(conversation, index) in conversations"
			:key="index"
			class="flex flex-col border-t-none h-full border-gray-200 overflow-auto dark:border-gray-800 xl:h-[calc(100vh-73px)]"
		>
			<div
				class="p-4 dark:border-gray-800 border-b cursor-pointer"
				@click="emits('itemClicked', conversation.id)"
			>
				<div class="flex justify-between text-gray-500">
					<label class="capitalize truncate w-64">
						{{ conversation.participants.join(', ') }}
					</label>
					<span>
						{{
							convertConversationTimestamp(conversation.lastMessage.createdAt)
						}}
					</span>
				</div>
				<p
					class="dark:text-gray-700 text-gray-700 truncate line-clamp-1 text-sm"
				>
					{{ conversation.lastMessage.message }}
				</p>
			</div>
		</div>
	</template>
	<template v-else>
		<div
			class="w-full h-full flex flex-col justify-center items-center"
			v-if="conversations == null"
		>
			<UIcon
				name="i-heroicons-arrow-path"
				class="w-10 h-10 dark:text-gray-700 text-gray-200 animate-spin"
			/>
		</div>
		<div
			class="w-full h-full flex flex-col justify-center gap-2 items-center"
			v-else
		>
			<UIcon
				name="i-heroicons-inbox"
				class="w-14 h-14 dark:text-gray-700 text-gray-200"
			/>
			<div class="dark:text-gray-700 text-gray-200">You have no messages</div>
		</div>
	</template>
</template>
