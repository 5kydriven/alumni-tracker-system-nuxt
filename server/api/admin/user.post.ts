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
				statusMessage: 'no content',
				message: 'Body has no content',
			});
		}

		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
			displayName: body.name,
		});

		const userRef = db.collection('users').doc(userDetails.uid);
		batch.set(
			userRef,
			{ ...body, createdAt: Timestamp.now() },
			{ merge: true },
		);

		const roleRef = db.collection(body.role).doc(userDetails.uid);
		batch.set(roleRef, { ...body, uid: userDetails.uid }, { merge: true });

		const result = await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully created user',
			data: result,
		} as H3Response;
	} catch (error: any) {
		console.log('/admin/usesPost: ', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'conflict',
				message: 'Email already exists',
				data: error,
			});
		}
		return errorResponse(error);
	}
});
