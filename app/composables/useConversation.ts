import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function useConversation() {
	const conversations = ref<Conversations[]>([]);
	const isLoading = ref(false);

	function fetchConversations(user: any, q: any, db: any) {
		isLoading.value = true;
		const unsubscribe = onSnapshot(q, async (querySnapshot: any) => {
			const snapshotPromises = querySnapshot.docs.map(async (docSnap: any) => {
				const conversation = docSnap.data();
				const conversationId = docSnap.id;

				if (conversation.isGroup) {
					return { ...conversation, id: conversationId };
				} else {
					const name = await getParticipantName(
						conversationId,
						db,
						user.value.uid,
					);
					return { ...conversation, id: conversationId, name };
				}
			});

			const snapshot = await Promise.all(snapshotPromises);
			conversations.value = snapshot;
			isLoading.value = false;
		});

		return unsubscribe;
	}

	async function getParticipantName(
		conversationUid: string,
		db: any,
		currentUid: string,
	) {
		try {
			const chatDoc = await getDoc(doc(db, 'conversations', conversationUid));
			const participants = chatDoc.data()?.participants;
			const participantId = participants.find(
				(id: string) => id !== currentUid,
			);
			if (chatDoc.data()?.isGroup) {
				return chatDoc.data()?.name;
			} else {
				const participantDoc = await getDoc(doc(db, 'users', participantId));
				return participantDoc.data()?.name;
			}
		} catch (error) {
			console.error('Error fetching participant name:', error);
			return '';
		}
	}

	return {
		conversations,
		isLoading,
		fetchConversations,
		getParticipantName,
	};
}
