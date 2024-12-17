import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();

	try {
		const users = db.collection('users');
		const snapshot = await users.get();

		const result = snapshot.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));

		return result;
	} catch (error) {
		return error;
	}
});
