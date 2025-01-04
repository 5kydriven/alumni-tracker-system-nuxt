import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();

	try {
		const snapShot = await db.collection('jobs').get();

		return snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
	} catch (error: any) {
		console.log('/job.get', error);
	}
});
