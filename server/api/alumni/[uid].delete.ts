import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

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

		if (!doc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Not found',
				message: 'Alumni not found',
			});
		}

		const role = doc.data()?.role;
		const batch = db.batch();

		batch.delete(db.collection(role).doc(param));
		batch.delete(db.collection('users').doc(param));
		await batch.commit();

		const user = await getAuth().deleteUser(param);

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Successfully deleted a user',
			data: { doc: doc, user: user },
		};
	} catch (err: any) {
		console.log('/alumni.delete: ', err);
		return errorResponse(err);
	}
});
