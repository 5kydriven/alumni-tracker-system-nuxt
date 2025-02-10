import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const educationUid = getRouterParam(event, 'uid');
	const { userUid } = await readBody(event);
	try {
		if (!educationUid || !userUid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No content found',
			});
		}

		const educationSnapshot = await db
			.collection('users')
			.doc(userUid)
			.collection('education')
			.doc(educationUid)
			.delete();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted attainment!',
			data: educationSnapshot,
		} as H3Response;
	} catch (error: any) {
		console.log('alumni/education.delete', error);
		return errorResponse(error);
	}
});
