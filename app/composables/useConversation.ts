import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function useConversation() {
	const conversations = useState<Conversations[]>('conversations', () => null);

	function fetchConversations(user: any, q: any, db: any) {
		const unsubcribe = onSnapshot(q, async (querySnapshot: any) => {
			const snapshot = [];
			for (const docSnap of querySnapshot.docs) {
				const conversation = docSnap.data();
				const participantName = await getParticipantName(
					docSnap.id,
					db,
					user.value.uid,
				);

				snapshot.push({
					...conversation,
					id: docSnap.id,
					participantName,
				});
			}
			conversations.value = snapshot;
		});
		return unsubcribe;
	}

	async function getParticipantName(
		conversationUid: string,
		db: any,
		currentUid: string,
	) {
		const chatDoc = await getDoc(doc(db, 'conversations', conversationUid));

		const participants = chatDoc.data().participants;
		const participantId = participants.find((id: string) => id !== currentUid);
		const participantDoc = await getDoc(doc(db, 'users', participantId));

		return participantDoc.data().name;
	}

	return {
		conversations,
		fetchConversations,
		getParticipantName,
	};
}
