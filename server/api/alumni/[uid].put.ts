import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody<Alumni>(event);
	const param = getRouterParam(event, 'uid');
	const batch = db.batch();
	try {
		if (!body || !param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'Body or id has no content',
			});
		}

		const phoneNumber = `+63${body.phoneNumber}`;
		await getAuth().updateUser(param, {
			email: body.email,
			password: body.password,
			phoneNumber: phoneNumber,
		});

		const alumniRef = db.collection('alumni').doc(param);
		batch.set(
			alumniRef,
			{
				...body,
				password: '********',
				phoneNumber,
				isUpdated: true,
				status: 'unemployed',
				updatedAt: Timestamp.now(),
			},
			{ merge: true },
		);

		const userRef = db.collection('users').doc(param);
		batch.update(userRef, {
			password: '********',
			email: body.email,
			userCredentials: {
				...body,
				phoneNumber,
				updatedAt: Timestamp.now(),
				isUpdated: true,
				status: 'unemployed',
			},
		});

		const result = await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully updated personal account!',
			data: result,
		} as H3Response;
	} catch (error: any) {
		console.log('/alumni.put', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'conflict',
				message: 'Email already exists',
			});
		}
		return errorResponse(error);
	}
});
