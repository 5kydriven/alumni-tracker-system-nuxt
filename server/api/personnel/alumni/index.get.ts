import { H3Event } from 'h3';
import { getFirestore, Query } from 'firebase-admin/firestore';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, courses, statuses, limit, offset, batch } = getQuery(event);

	try {
		let queryRef: Query = db
			.collection('users')
			.where('role', '==', 'alumni')
			.orderBy('userCredentials.course', 'asc')
			.orderBy('lastname', 'asc');

		let countQueryRef: Query = db
			.collection('users')
			.where('role', '==', 'alumni');

		if (q) {
			const queryLowerCase = q.toString().toLowerCase();
			queryRef = queryRef
				.where('searchKeywords', 'array-contains', queryLowerCase)
				.limit(3);
		} else {
			queryRef = queryRef.limit(Number(limit));
		}

		if (courses) {
			const courseArray = Array.isArray(courses) ? courses : [courses];
			queryRef = queryRef.where('userCredentials.course', 'in', courseArray);
			countQueryRef = countQueryRef.where(
				'userCredentials.course',
				'in',
				courseArray,
			);
		}

		if (statuses) {
			const statusArray = Array.isArray(statuses) ? statuses : [statuses];
			queryRef = queryRef.where('userCredentials.status', 'in', statusArray);
			countQueryRef = countQueryRef.where(
				'userCredentials.status',
				'in',
				statusArray,
			);
		}

		if (batch) {
			const batchArray = Array.isArray(batch) ? batch : [batch];
			queryRef = queryRef.where('userCredentials.batch', 'in', batchArray);
			countQueryRef = countQueryRef.where(
				'userCredentials.batch',
				'in',
				batchArray,
			);
		}

		if (offset) {
			queryRef = queryRef.offset(Number(offset));
		}

		const snapShot = await queryRef.get();
		const countSnap = await countQueryRef.count().get();

		const alumni = snapShot.docs.map((doc, index) => ({
			...doc.data(),
			uid: doc.id,
			id: index + Number(offset),
		})) as Alumni[];

		return {
			data: alumni,
			total: countSnap.data().count,
		};
	} catch (error) {
		console.log('/alumni.get: ', error);
	}
});
