import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody<Alumni[]>(event);
	const db = getFirestore();
	const batch = db.batch();
	try {
		if (!body || body.length === 0) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No body provided',
			});
		}

		const uids = body.map((item) => item.uid || '');

		for (const uid of uids) {
			const userDocRef = db.collection('users').doc(uid);
			const alumniDocRef = db.collection('alumni').doc(uid);

			batch.delete(userDocRef);
			batch.delete(alumniDocRef);
		}

		const users = await getAuth().deleteUsers(uids);

		const result = await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: "Successfully deleted alumni's",
			data: [result, users],
		};
	} catch (error: any) {
		console.log('/registrar/alumni.delete', error);
		return errorResponse(error);
	}
});
