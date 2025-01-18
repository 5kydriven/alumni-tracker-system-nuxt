import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);

	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'not found',
			});
		}
	} catch (error: any) {
		console.log('/registrar/message.post', error);
		return errorResponse(error);
	}
});
