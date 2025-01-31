import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	try {
		const docRef = await db
			.collection('chats')
			.doc(body.uid)
			.collection('messages')
			.add(body);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully created message',
			data: docRef,
		};
	} catch (error: any) {
		console.log('/chat/message.post', error);
	}
});
