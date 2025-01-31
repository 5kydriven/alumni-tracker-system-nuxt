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
		const doc = await db.collection('alumni').doc(param).get();

		if (!doc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Alumni not found',
			});
		}

		return doc.data();
	} catch (error) {
		console.log('/alumni.[uid].get: ', error);
		return errorResponse(error);
	}
});
