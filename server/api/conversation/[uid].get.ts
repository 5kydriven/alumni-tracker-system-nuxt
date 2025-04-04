import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	try {
		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required uid',
			});
		}
		const snapShot = await db.collection('conversations').doc(uid).get();

		return successResponse({ data: { ...snapShot.data(), uid: snapShot.id } });
	} catch (error: any) {
		console.log('/chat.get', error);
		return errorResponse(error);
	}
});
