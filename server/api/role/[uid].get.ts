import { H3Event } from 'h3';
import { getFirestore } from 'firebase-admin/firestore';

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

		const doc = await db.collection('users').doc(param).get();

		return doc.data()?.role;
	} catch (error: any) {
		console.log('/role.uid.get: ', error);
		return errorResponse(error);
	}
});
