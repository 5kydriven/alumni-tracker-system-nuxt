import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();

	try {
		// const batchesSnapshot = await db
		// 	.collection('users')
		// 	.select('userCredentials.batch')
		// 	.get();

		// const uniqueBatches = new Set(
		// 	batchesSnapshot.docs
		// 		.map((doc) => doc.data().userCredentials?.batch)
		// 		.filter(Boolean),
		// );

		// const batchCounts = await Promise.all(
		// 	Array.from(uniqueBatches).map(async (batch) => {
		// 		const batchQuery = db
		// 			.collection('users')
		// 			.where('userCredentials.batch', '==', batch);

		// 		// Count users based on their employment status
		// 		const [employedCount, unemployedCount, unknownCount] =
		// 			await Promise.all([
		// 				batchQuery
		// 					.where('userCredentials.status', '==', 'employed')
		// 					.count()
		// 					.get(),
		// 				batchQuery
		// 					.where('userCredentials.status', '==', 'unemployed')
		// 					.count()
		// 					.get(),
		// 				batchQuery
		// 					.where('userCredentials.status', '==', 'unknown')
		// 					.count()
		// 					.get(),
		// 			]);

		// 		return {
		// 			year: Number(batch),
		// 			employed: employedCount.data().count,
		// 			unemployed: unemployedCount.data().count,
		// 			unknown: unknownCount.data().count,
		// 		};
		// 	}),
		// );

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
