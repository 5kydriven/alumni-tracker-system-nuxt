import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const uid = await readBody(event);
	const db = getFirestore();
	try {
		const userDoc = await db.collection('users').doc(uid).get();

		const role = userDoc.data()?.role;
		const batch = db.batch();

		batch.delete(db.collection(role).doc(uid));
		batch.delete(db.collection('users').doc(uid));
		const result = await batch.commit();

		const user = await getAuth().deleteUser(uid);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully deleted a user',
			data: [result, user],
		};
	} catch (error: any) {
		console.log('/registrar/alumni.delete: ', error);
		return errorResponse(error);
	}
});
