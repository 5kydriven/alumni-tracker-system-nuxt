import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

export default function useMessageUtils() {
	async function fetchOtherUserName(
		db: any,
		participants: string[],
		currentUid: string,
	) {
		const otherUid = participants.find((uid) => uid !== currentUid);

		const userDoc = doc(db, `users/${otherUid}`);
		const userSnapshot = await getDoc(userDoc);
		return userSnapshot.exists() ? userSnapshot.data().name : 'Unknown User';
	}

	async function fetchUserConversations(db: any, uid: string) {
		const conversationsRef = collection(db, 'conversations');
		const q = query(
			conversationsRef,
			where('participants', 'array-contains', uid),
		);
		const snapshot = await getDocs(q);

		return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
	}

	async function fetchConversationsWithDetails(db: any, currentUserId: string) {
		const conversations = await fetchUserConversations(db, currentUserId);

		const detailedConversations = await Promise.all(
			conversations.map(async (conversation: any) => {
				if (conversation.type === '1-on-1') {
					// Fetch the other user's name
					const otherUserName = await fetchOtherUserName(
						db,
						conversation.participants,
						currentUserId,
					);
					return {
						...conversation,
						displayName: otherUserName, // Display name for 1-on-1
					};
				} else if (conversation.type === 'group') {
					return {
						...conversation,
						displayName: conversation.name, // Group name for group chats
					};
				}
				return conversation;
			}),
		);

		return detailedConversations;
	}

	return {
		fetchOtherUserName,
		fetchUserConversations,
		fetchConversationsWithDetails,
	};
}
