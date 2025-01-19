import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default eventHandler(async (event: H3Event) => {
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

		const alumniDoc = await db.collection('alumni').doc(param).get();

		if (!alumniDoc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Alumni does not exist',
			});
		}

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: alumniDoc.data(),
		} as H3Response;
	} catch (error: any) {
		console.log('/api/registrar/alumni/uid.get ', error);
		return errorResponse(error);
	}
});
