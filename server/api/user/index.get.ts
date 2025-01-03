import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();

	try {
		const employersSnapshot = await db.collection('employer').get();
		const registrarsSnapshot = await db.collection('registrar').get();
		const combinedData = [
			...employersSnapshot.docs.map((doc) => doc.data()),
			...registrarsSnapshot.docs.map((doc) => doc.data()),
		];

		return combinedData;
	} catch (error: any) {
		console.log('/user.get: ', error);
		return errorResponse(error);
	}
});
