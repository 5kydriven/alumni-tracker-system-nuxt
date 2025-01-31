import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default eventHandler(async (event: H3Event) => {
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

		const doc = await db.collection('users').doc(param).get();

		const role = doc.data()?.role;
		const batch = db.batch();

		batch.delete(db.collection(role).doc(param));
		batch.delete(db.collection('users').doc(param));
		await batch.commit();

		const user = await getAuth().deleteUser(param);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted a user',
			data: { doc: doc, user: user },
		} as H3Response;
	} catch (error: any) {
		console.log('/user.delete', error);
		return errorResponse(error);
	}
});
