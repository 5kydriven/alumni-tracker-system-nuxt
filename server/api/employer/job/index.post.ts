import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import errorResponse from '~~/server/utils/errorResponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'Body has no content',
			});
		}
		const res = await db
			.collection('jobs')
			.add({ ...body, createdAt: Timestamp.now() });

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully created job',
			data: { uid: res.id },
		} as H3Response;
	} catch (error: any) {
		console.log('/employer/job.post', error);
		return errorResponse(error);
	}
});
