import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();
	const { uid } = await readBody(event);

	try {
		if (!uid) {
			throw createError({});
		}

		const docRef = await db.collection('users').doc(uid).get();

		return docRef.data()?.role;
	} catch (error) {
		console.log('/role.post: ', error);
		return null;
	}
});
