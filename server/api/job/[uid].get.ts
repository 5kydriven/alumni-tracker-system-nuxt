import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No uid provided',
			});
		}

		const doc = await db.collection('jobs').doc(param).get();

		if (!doc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Not found',
				message: 'Job not found',
				data: { uid: param },
			});
		}

		return doc.data();
	} catch (error: any) {
		console.log('/job.[uid].get', error);
		return errorResponse(error);
	}
});
