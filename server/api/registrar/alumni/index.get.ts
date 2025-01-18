import { H3Event } from 'h3';
import { getFirestore, Query } from 'firebase-admin/firestore';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, courses, statuses, limit, offset } = getQuery(event);
	try {
		let queryRef: Query = db.collection('alumni').orderBy('name', 'asc');
		if (q) {
			const queryLowerCase = q.toString().toLowerCase();
			queryRef = queryRef.where(
				'searchKeywords',
				'array-contains',
				queryLowerCase,
			);
		}

		if (courses) {
			const courseArray = Array.isArray(courses) ? courses : [courses];

			queryRef = queryRef.where('course', 'in', courseArray);
		}

		if (statuses) {
			const statusArray = Array.isArray(statuses) ? statuses : [statuses];

			queryRef = queryRef.where('status', 'in', statusArray);
		}

		queryRef = queryRef.limit(Number(limit));
		queryRef = queryRef.offset(Number(offset));

		const snapShot = await queryRef.get();
		const countSnap = await db.collection('alumni').count().get();

		const alumni = snapShot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		})) as Alumni[];

		return {
			data: alumni,
			total: countSnap.data().count,
		};
	} catch (error) {
		console.log('/alumni.get: ', error);
	}
});
