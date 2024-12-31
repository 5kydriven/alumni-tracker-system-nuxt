import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const param = getRouterParam(event, 'uid');
	const db = getFirestore();
	try {
		if (!param) {
			throw createError({});
		}
		const docRef = await db.collection('alumni').doc(param).get();

		return docRef.data();
	} catch (error) {
		console.log('alumni:uid: ', error);
		return null;
	}
});
