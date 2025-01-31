import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No uid provided',
			});
		}

		const snapShot = await db
			.collection('chats')
			.doc(param)
			.collection('messages')
			.get();

		return snapShot.docs.map((doc) => doc.data());
	} catch (error: any) {
		console.log('/chat/message.get', error);
	}
});
