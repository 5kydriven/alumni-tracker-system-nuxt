import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody<Alumni>(event);
	const param = getRouterParam(event, 'uid');

	try {
		if (!body || !param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Body or id has no content',
			});
		}

		const phoneNumber = `+63${body.phoneNumber}`;
		const user = await getAuth().updateUser(param, {
			email: body.email,
			password: body.password,
			phoneNumber: phoneNumber,
		});

		const res = await db
			.collection('alumni')
			.doc(param)
			.set(
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

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Succesfully updated personal account!',
			data: res,
		};
	} catch (error: any) {
		console.log('/alumni.put', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'Conflict',
				message: 'Email already exists',
			});
		}
		return errorResponse(error);
	}
});
