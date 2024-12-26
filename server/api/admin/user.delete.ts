import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();
	const { uid } = await readBody(event);

	try {
		const userDoc = await db.collection('users').doc(uid).get();

		const role = userDoc.data()?.role;
		const batch = db.batch();

		batch.delete(db.collection(role).doc(uid));
		batch.delete(db.collection('users').doc(uid));
		await batch.commit();

		await getAuth().deleteUser(uid);

		return {
			statusCode: 200,
			statusMessage: 'Successfully deleted a user',
		};
	} catch (err: any) {
		console.log('userDelete: ', err);
		return {
			statusCode: 400,
			statusMessage: 'Something went wrong!',
		};
	}
});
