import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	const uid = getRouterParam(event, 'uid');

	try {
		if (!body) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required body',
			});
		}

		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required parameter',
			});
		}

		const res = await db
			.collection('jobs')
			.doc(uid)
			.set(
				{
					...body,
					searchKeywords: generateSearchKeywords(body.title.toLowerCase()),
					updatedAt: Timestamp.now(),
				},
				{ merge: true },
			);

		return okReponse({
			message: 'Successfully updated job',
			data: res,
		});
	} catch (error: any) {
		console.log('/employer/job.post', error);
		return errorResponse(error);
	}
});
