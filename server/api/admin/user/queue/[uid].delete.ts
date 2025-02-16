import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	if (!uid) {
		throw createError({
			statusCode: 204,
			statusMessage: 'no content',
			message: 'Required uid',
		});
	}
	try {
		const snap = await db.collection('queues').doc(uid).delete();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully rejected employer',
			data: snap,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
