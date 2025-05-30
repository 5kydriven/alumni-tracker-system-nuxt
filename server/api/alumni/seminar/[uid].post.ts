import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody(event);
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();
	try {
		if (!uid || !body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Not found ',
			});
		}

		const experienceSnapshot = await db
			.collection('users')
			.doc(uid)
			.collection('seminars')
			.add({ ...body, createdAt: Timestamp.now() });

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully added seminar/training',
			data: experienceSnapshot,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
