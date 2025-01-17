import { H3Event } from 'h3';
import { getFirestore, Query } from 'firebase-admin/firestore';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, courses, statuses } = getQuery(event);
	try {
		let queryRef: Query = db.collection('alumni').orderBy('name', 'asc');
		if (q) {
			const queryLowerCase = q.toString().toLowerCase();
			queryRef = queryRef.where(
				'searchKeywords',
				'array-contains',
				queryLowerCase,
			);
			// .where('name', '>=', queryLowerCase)
			// .where('name', '<=', queryLowerCase + '\uf8ff');
		}

		if (courses) {
			const courseArray = Array.isArray(courses) ? courses : [courses];

			queryRef = queryRef.where('course', 'in', courseArray);
		}

		if (statuses) {
			const statusArray = Array.isArray(statuses) ? statuses : [statuses];

			queryRef = queryRef.where('status', 'in', statusArray);
		}
		const snapShot = await queryRef.get();

		return snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
	} catch (error) {
		console.log('/alumni.get: ', error);
	}
});
