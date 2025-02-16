import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	// const { q } = getQuery(event);
	try {
		const countSnap = await db.collection('queues').count().get();
		const queueSnapShot = await db
			.collection('queues')
			.orderBy('createdAt', 'desc')
			.get();

		const queues = queueSnapShot.docs.map((doc, index) => ({
			...doc.data(),
			uid: doc.id,
			id: index,
		}));

		return {
			statusCode: 200,
			statusMessage: 'ok',
			total: countSnap.data().count,
			data: queues,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
