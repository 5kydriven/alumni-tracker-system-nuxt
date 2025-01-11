import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	const body = await readBody(event);

	try {
		if (!param || !body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No content provided',
			});
		}

		const messageRef = await db
			.collection('conversations')
			.doc(param)
			.collection('messages')
			.add({ ...body, createdAt: Timestamp.now() });

		const conversationRef = await db
			.collection('conversations')
			.doc(param)
			.update({ lastMessage: { ...body, createdAt: Timestamp.now() } });

		return { messageRef, conversationRef };
	} catch (error) {
		console.log('/conversation/message.uid.post', error);
	}
});
