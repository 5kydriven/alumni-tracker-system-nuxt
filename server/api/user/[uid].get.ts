import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

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
		console.log('uid', param);
		const userDoc = await db.collection('users').doc(param).get();

		if (!userDoc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'no user found',
				data: userDoc,
			});
		}

		return successResponse({ data: { ...userDoc.data(), uid: userDoc.id } });
	} catch (error: any) {
		console.log('/user.uid.get', error);
		return errorResponse(error);
	}
});
