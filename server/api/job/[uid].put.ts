import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import errorResponse from '~~/server/utils/errorResponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');
	const body = await readBody(event);
	try {
		if (!body || !param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Body or param has no content',
			});
		}

		const res = await db.collection('jobs').doc(param).update(body);

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Succesfully updated job',
			data: {
				response: res,
				...body,
			},
		};
	} catch (error: any) {
		if (error.code === 'not-found') {
			return errorResponse(
				createError({
					statusCode: 404,
					statusMessage: 'Document Not Found',
					message: `No document found with UID: ${param}.`,
					data: error,
				}),
			);
		}
		console.log('/job.put', error);
		return errorResponse(error);
	}
});
