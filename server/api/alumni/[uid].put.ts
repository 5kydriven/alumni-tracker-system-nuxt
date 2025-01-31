import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const {
		email,
		password,
		phoneNumber,
		gender,
		province,
		city,
		zipCode,
		birthDate,
		birthPlace,
		maritalStatus,
	} = await readBody<Alumni>(event);
	const param = getRouterParam(event, 'uid');

	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No uid has found',
			});
		}

		const formatedPhoneNumber = `+63${phoneNumber}`;
		await getAuth().updateUser(param, {
			email,
			password,
			phoneNumber: formatedPhoneNumber,
		});

		const userRef = await db
			.collection('users')
			.doc(param)
			.set(
				{
					password: '********',
					email,
					updatedAt: Timestamp.now(),
					isUpdated: true,
					status: 'unemployed',
					userCredentials: {
						gender,
						province,
						zipCode,
						city,
						birthDate,
						birthPlace,
						maritalStatus,
						phoneNumber: formatedPhoneNumber,
					},
				},
				{ merge: true },
			);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully updated personal account!',
			data: userRef,
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
