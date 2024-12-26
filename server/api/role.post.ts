import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();
	const { uid } = await readBody(event);

	try {
		const userSnapshot = await db
			.collection('users')
			.where('user_id', '==', uid)
			.get();

		const role = userSnapshot.docs[0].data().role;
		return role;
	} catch (error) {
		console.log('/role.get: ', error);
	}
});
