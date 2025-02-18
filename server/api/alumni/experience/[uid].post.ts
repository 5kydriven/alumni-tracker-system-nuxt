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

		const endDateTimestamp = body.endDate.year * 100 + body.endDate.month;
		const experienceSnapshot = await db
			.collection('users')
			.doc(uid)
			.collection('workExperience')
			.add({ ...body, createdAt: Timestamp.now(), endDateTimestamp });

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully added work experience',
			data: experienceSnapshot,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
