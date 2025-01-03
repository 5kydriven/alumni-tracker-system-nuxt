import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import errorResponse from '~~/server/utils/errorResponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const params = getRouterParam(event, 'uid');
	try {
		if (!params) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No uid provided',
			});
		}
		const res = await db.collection('jobs').doc(params).delete();

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Succesfully deleted job',
			body: res,
		} as H3Response;
	} catch (error: any) {
		console.log('/job.delete', error);
		return errorResponse(error);
	}
});
