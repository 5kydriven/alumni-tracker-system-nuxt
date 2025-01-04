import { H3Event } from 'h3';
import { getFirestore } from 'firebase-admin/firestore';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	try {
		const snapShot = await db.collection('alumni').get();

		return snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
	} catch (error) {
		console.log('/alumni.get: ', error);
	}
});
