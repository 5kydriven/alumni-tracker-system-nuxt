import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const experienceUid = getRouterParam(event, 'uid');
	const { userUid } = await readBody(event);
	try {
		if (!experienceUid || !userUid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No content found',
			});
		}

		const experienceSnapshot = await db
			.collection('users')
			.doc(userUid)
			.collection('workExperience')
			.doc(experienceUid)
			.delete();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted work experience!',
			data: experienceSnapshot,
		} as H3Response;
	} catch (error: any) {
		console.log('alumni/experience.delete', error);
		return errorResponse(error);
	}
});
