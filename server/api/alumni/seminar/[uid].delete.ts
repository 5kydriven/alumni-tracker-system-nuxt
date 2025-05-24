import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const seminarUid = getRouterParam(event, 'uid');
	const { userUid } = await readBody(event);
	try {
		if (!seminarUid || !userUid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No content found',
			});
		}

		const educationSnapshot = await db
			.collection('users')
			.doc(userUid)
			.collection('seminars')
			.doc(seminarUid)
			.delete();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted seminar/training!',
			data: educationSnapshot,
		} as H3Response;
	} catch (error: any) {
		console.log('alumni/seminar.delete', error);
		return errorResponse(error);
	}
});
