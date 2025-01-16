import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = getFirestore();
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

		await db
			.collection('users')
			.doc(userDetails.uid)
			.set({ ...body, createdAt: Timestamp.now() });

		await db
			.collection(body.role)
			.doc(userDetails.uid)
			.set({ ...body, uid: userDetails.uid });

		return {
			statusCode: 200,
			statusMessage: 'Successfully created user',
			data: { ...body, uid: userDetails.uid },
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
