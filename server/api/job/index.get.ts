import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, type } = getQuery(event);

	try {
		let queryRef = db.collection('jobs').orderBy('createdAt', 'desc');

		if (q) {
			const queryLowerCase = q.toString().toLowerCase();
			queryRef = queryRef
				.where('searchKeywords', 'array-contains', queryLowerCase)
				.limit(5);
		}

		if (type) {
			const courseArray = Array.isArray(type) ? type : [type];
			queryRef = queryRef.where('type', 'in', courseArray);
		}

		const snapShot = await queryRef.get();

		const jobs = snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));

		return successResponse({ data: jobs });
	} catch (error: any) {
		console.error('/job.get', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			message: error.message,
		});
	}
});
