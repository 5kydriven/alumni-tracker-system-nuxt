import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, type, limit, offset } = getQuery(event);

	try {
		let queryRef = db.collection('jobs').orderBy('createdAt', 'desc');

		if (q) {
			const queryLowerCase = q.toString().toLowerCase();
			queryRef = queryRef
				.where('searchKeywords', 'array-contains', queryLowerCase)
				.limit(3);
		} else {
			queryRef = queryRef.limit(Number(limit));
		}

		if (type) {
			const courseArray = Array.isArray(type) ? type : [type];
			queryRef = queryRef.where('type', 'in', courseArray);
		}

		if (offset) {
			queryRef = queryRef.offset(Number(offset));
		}

		const snapShot = await queryRef.get();

		const jobs = snapShot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
		const totalJobs = await queryRef.count().get();

		return successResponse({ data: jobs, total: totalJobs.data().count });
	} catch (error: any) {
		console.error('/job.get', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			message: error.message,
		});
	}
});
