import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody<Alumni>(event);
	const db = getFirestore();

	try {
		if (!body || !body.uid) {
			throw createError({
				statusCode: 204,
			});
		}

		const phoneNumber = `+63${body.phoneNumber}`;
		const user = await getAuth().updateUser(body.uid, {
			email: body.email,
			password: body.password,
			phoneNumber: phoneNumber,
		});

		await db
			.collection('alumni')
			.doc(body.uid)
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

		await db
			.collection('users')
			.doc(body.uid)
			.update({
				password: '********',
				email: body.email,
				updatedAt: Timestamp.now(),
				userCredentials: {
					...body,
					isUpdated: true,
					status: 'unemployed',
				},
			});

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully updated personal account!',
		} as H3Response;
	} catch (error: any) {
		console.log('/api/alumni.put', error);
		return errorResponse(error);
	}
});
