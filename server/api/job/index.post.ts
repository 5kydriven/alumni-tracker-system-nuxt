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
				statusMessage: 'No content',
				message: 'Body has no content',
			});
		}
		const res = await db
			.collection('jobs')
			.add({ ...body, createdAt: Timestamp.now() });

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Succesfully created job',
			data: { uid: res.id },
		};
	} catch (error: any) {
		console.log('/job.post', error);
		return errorResponse(error);
	}
});
