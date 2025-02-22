import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, type } = getQuery(event);

	try {
		let query = db.collection('jobs').orderBy('createdAt', 'desc');

		if (q) {
			query = query.where('searchKeywords', 'array-contains', q);
		}

		if (type && Array.isArray(type)) {
			query = query.where('type', 'in', type);
		}

		const snapShot = await query.get();

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
