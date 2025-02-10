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

		const educationSnapshot = await db
			.collection('users')
			.doc(uid)
			.collection('education')
			.orderBy('endDate', 'desc')
			.get();

		const education = educationSnapshot.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: education as EducationalBackground[],
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
