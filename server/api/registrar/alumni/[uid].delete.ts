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
		await batch.commit();

		await getAuth().deleteUser(uid);

		return {
			status: 200,
			message: 'Successfully deleted a user',
		};
	} catch (err: any) {
		console.log('/registrar/alumni.delete: ', err);
		return {
			status: 400,
			message: 'Something went wrong!',
		};
	}
});
