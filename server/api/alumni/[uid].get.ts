import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const param = getRouterParam(event, 'uid');
	const db = getFirestore();
	const docRef = await db
		.collection('alumni')
		.doc(param?.toString() ?? '')
		.get();

	return docRef.data();
});
