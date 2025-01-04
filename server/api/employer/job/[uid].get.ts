import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No uid provided',
			});
		}

		const snapShot = await db
			.collection('jobs')
			.where('employerUid', '==', param)
			.get();

		return snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
	} catch (error: any) {
		console.log('/employer/job.uid.get', error);
		return errorResponse(error);
	}
});
