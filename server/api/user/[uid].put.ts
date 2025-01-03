import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const param = getRouterParam(event, 'uid');

	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No uid provided',
			});
		}

		const doc = await db.collection('users').doc(param).get();
		const role = doc.data()?.role;

		const user = await db.collection(role).doc(param).get();

		return { ...user.data(), uid: user.id };
	} catch (error: any) {
		console.log('/user.put', error);
		return errorResponse(error);
	}
});
