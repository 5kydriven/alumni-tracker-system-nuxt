import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();

	try {
		const snapshot = await db.collection('users').get();
		const users = snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: users,
		} as H3Response;
	} catch (error: any) {
		console.log('/user.get: ', error);
		return errorResponse(error);
	}
});
