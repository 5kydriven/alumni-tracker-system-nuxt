import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();
	try {
		if (!uid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Not found ',
			});
		}

		const snapshot = await db
			.collection('users')
			.doc(uid)
			.collection('seminars')
			.orderBy('createdAt', 'desc')
			.get();

		const seminars = snapshot.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));

		return successResponse({
			data: seminars as Seminar[],
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
