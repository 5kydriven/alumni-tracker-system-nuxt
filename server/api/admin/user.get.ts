import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();

	try {
		const employersSnapshot = await db.collection('users').where('role', '==', 'employer').get();
		const registrarsSnapshot = await db.collection('users').where('role', '==', 'registrar').get();
		const combinedData = [
			...employersSnapshot.docs.map((doc) => ({...doc.data(), uid: doc.id})),
			...registrarsSnapshot.docs.map((doc) => ({...doc.data(), uid: doc.id})),
		];

		return combinedData;
	} catch (error) {
		console.log('/admin/user.get: ', error);
		return error;
	}
});
