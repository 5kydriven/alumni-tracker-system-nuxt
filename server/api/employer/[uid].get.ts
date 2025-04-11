import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	if (!uid) {
		throw createError({
			statusCode: 400,
			statusMessage: 'bad request',
			message: 'Required uid',
		});
	}

	try {
		const employerDoc = await db.collection('users').doc(uid).get();

		return successResponse({ data: employerDoc.data() });
	} catch (error: any) {
		return errorResponse(error);
		console.log('/employer.get: ', error);
	}
});
