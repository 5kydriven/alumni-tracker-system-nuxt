import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	try {
		const docRef = await db
			.collection('chats')
			.add({ ...body, createdAt: Timestamp.now() });

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully added chat',
			data: docRef,
		};
	} catch (error: any) {
		console.log('/chat.post', error);
	}
});
