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

		const doc = await db.collection('jobs').doc(param).get();

		if (!doc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Job not found',
				data: { uid: param },
			});
		}

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: { ...doc.data(), uid: doc.id },
		} as H3Response;
	} catch (error: any) {
		console.log('/job.[uid].get', error);
		return errorResponse(error);
	}
});
