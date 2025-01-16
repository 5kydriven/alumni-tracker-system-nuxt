import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = getFirestore();
	const batch = db.batch();
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Body has no content',
			});
		}

		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
		});

		const userRef = db.collection('users').doc(userDetails.uid);
		batch.set(userRef, { ...body, createdAt: Timestamp.now() });

		const roleRef = db.collection(body.role).doc(userDetails.uid);
		batch.set(roleRef, { ...body, uid: userDetails.uid });

		const result = await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Successfully created user',
			data: result,
		};
	} catch (error: any) {
		console.log('/admin/usesPost: ', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'Conflict',
				message: 'Email already exists',
				data: error,
			});
		}
		return errorResponse(error);
	}
});
