import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { form, survey } = await readBody<{
		form: User<AlumniCredentials>;
		survey: Survey;
	}>(event);
	const param = getRouterParam(event, 'uid');

	try {
		if (!param) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No uid has found',
			});
		}

		const { email, password, userCredentials } = form;

		const formatedPhoneNumber = `+63${userCredentials?.phoneNumber}`;
		const user = await getAuth().updateUser(param, {
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
					userCredentials: {
						status: survey.employmentStatus,
						gender: userCredentials?.gender,
						province: userCredentials?.province,
						zipCode: userCredentials?.zipCode,
						city: userCredentials?.city,
						birthDate: userCredentials?.birthDate,
						birthPlace: userCredentials?.birthPlace,
						maritalStatus: userCredentials?.maritalStatus,
						phoneNumber: formatedPhoneNumber,
					},
				},
				{ merge: true },
			);

		const surveyRef = await db
			.collection('surveys')
			.add({ ...survey, alumniUid: user.uid, createdAt: Timestamp.now });

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Succesfully updated personal account!',
			data: [userRef, surveyRef],
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
