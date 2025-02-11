import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');

	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No uid provided',
			});
		}
		const doc = await db.collection('users').doc(param).delete();

		const user = await getAuth().deleteUser(param);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted a user',
			data: { doc, user },
		} as H3Response;
	} catch (error: any) {
		console.log('userDelete: ', error);
		return errorResponse(error);
	}
});
