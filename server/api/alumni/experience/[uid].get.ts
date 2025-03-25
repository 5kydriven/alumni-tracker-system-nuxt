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

		const experienceSnapshot = await db
			.collection('users')
			.doc(uid)
			.collection('workExperience')
			.orderBy('endDateTimestamp', 'desc')
			.get();

		const experience = experienceSnapshot.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));

		return successResponse({
			data: experience as WorkExperience[],
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
