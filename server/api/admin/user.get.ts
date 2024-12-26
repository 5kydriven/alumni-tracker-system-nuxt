import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();

	try {
		const employersSnapshot = await db.collection('employer').get();
		const registrarsSnapshot = await db.collection('registrar').get();
		const combinedData = [
			...employersSnapshot.docs.map((doc) => doc.data()),
			...registrarsSnapshot.docs.map((doc) => doc.data()),
		];

		return combinedData;
	} catch (error) {
		console.log('/admin/user.get: ', error);
		return error;
	}
});
