import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	try {
		const snapShot = await db
			.collection('chats')
			.where('participants', 'array-contains', param)
			.get();

		return snapShot.docs.map((doc) => ({ ...doc.data(), chatUid: doc.id }));
	} catch (error: any) {
		console.log('/chat.get', error);
	}
});
