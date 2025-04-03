import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineCachedEventHandler(
	async (event: H3Event) => {
		const db = getFirestore();
		try {
			const batchSnap = await db.collection('analytics').get();
			const batch = batchSnap.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			}));

			return successResponse({ data: batch });
		} catch (error: any) {
			return errorResponse(error);
		}
	},
	{
		name: 'batch-cache',
		maxAge: 60 * 60 * 24 * 365 * 10,
	},
);
