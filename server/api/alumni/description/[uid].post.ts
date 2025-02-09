import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody(event);
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();
	try {
		console.log(uid);
		if (!uid || !body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Not found ',
			});
		}
		const descriptionSnapshot = db
			.collection('users')
			.doc(uid?.toString())
			.set(
				{
					userCredentials: {
						description: body,
					},
				},
				{ merge: true },
			);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully added description',
			data: descriptionSnapshot,
		};
	} catch (error: any) {
		return errorResponse(error);
	}
});
