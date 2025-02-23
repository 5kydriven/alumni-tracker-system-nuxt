import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import errorResponse from '~~/server/utils/errorResponse';
import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

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

		const res = await db.collection('jobs').add({
			...body,
			searchKeywords: generateSearchKeywords(body.title.toLowerCase()),
			createdAt: Timestamp.now(),
		});

		return successResponse({
			message: 'Successfully posted job',
			data: res.id,
		});
	} catch (error: any) {
		console.log('/employer/job.post', error);
		return errorResponse(error);
	}
});
