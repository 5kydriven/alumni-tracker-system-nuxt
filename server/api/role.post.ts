import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();
	const body = await readBody(event);

	try {
		const docRef = await db.collection('users').doc(body).get();

		return docRef.data()?.role;
	} catch (error) {
		console.log('/role.post: ', error);
	}
});
