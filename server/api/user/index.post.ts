import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);

	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No body provided',
			});
		}

		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
			displayName: body.name,
		});

		await db.collection('users').doc(userDetails.uid).set({
			role: body.role,
			email: body.email,
			name: body.name,
			createdAt: Timestamp.now(),
		});

		await db
			.collection(body.role)
			.doc(userDetails.uid)
			.set({ ...body, uid: userDetails.uid });

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Successfully created user',
			data: { ...body, uid: userDetails.uid },
		} as H3Response;
	} catch (error: any) {
		console.log('/user.post: ', error);
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
