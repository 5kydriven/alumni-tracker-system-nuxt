import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();

	try {
		const analyticsSnapshot = await db.collection('analytics').get();

		const analytics = analyticsSnapshot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		}));

		return successResponse({ data: analytics });
	} catch (error: any) {
		console.error('Error in aggregation:', error);
		return errorResponse(error);
	}
});
