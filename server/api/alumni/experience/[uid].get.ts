import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

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

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: experience as WorkExperience[],
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
