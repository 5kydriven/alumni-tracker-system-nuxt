import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const body = await readBody<Alumni>(event);
	const db = getFirestore();

	try {
		if (!body || !body.uid) {
			throw createError({
				statusCode: 301,
				statusMessage: 'Invalid value',
				message: 'Missing some value',
			});
		}

		const phoneNumber = `+63${body.phoneNumber}`;
		const user = await getAuth().updateUser(body.uid, {
			email: body.email,
			password: body.password,
			phoneNumber: phoneNumber,
		});

		console.log(user);

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

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Succesfully updated personal account!',
		};
	} catch (error: any) {
		console.log('/api/alumni.put', error);
		return {
			statusCode: 400,
			statusMessage: 'error',
			message: error.message,
		};
	}
});
