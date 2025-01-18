import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function useConversation() {
	const conversations = useState<Conversations[]>('conversations', () => []);

	function fetchConversations(user: any, q: any, db: any) {
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
			console.log(snapshot);
			conversations.value = snapshot;
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
			const participants = chatDoc.data().participants;
			const participantId = participants.find(
				(id: string) => id !== currentUid,
			);
			if (chatDoc.data().isGroup) {
				return chatDoc.data().name;
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
		fetchConversations,
		getParticipantName,
	};
}
