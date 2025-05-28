import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	const param = getRouterParam(event, 'uid');

	try {
		if (!param) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'No UID found',
			});
		}

		const { form, survey } = body as {
			form: User<AlumniCredentials>;
			survey: Survey;
		};

		const { email, password, userCredentials } = form;

		const rawPhoneNumber = userCredentials?.phoneNumber || '';
		const cleanedPhoneNumber = rawPhoneNumber.startsWith('0')
			? rawPhoneNumber.slice(1)
			: rawPhoneNumber;
		const formattedPhoneNumber = `+63${cleanedPhoneNumber}`;

		const user = await getAuth().updateUser(param, {
			email,
			password,
			phoneNumber: formattedPhoneNumber,
		});

		const batch = db.batch();
		const userRef = db.collection('users').doc(param);
		const surveyRef = db.collection('surveys').doc();
		const userDoc = await userRef.get();

		batch.set(
			userRef,
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
					phoneNumber: formattedPhoneNumber,
					description: null,
					workExperience: null,
					educationalBackground: null,
					survey,
				},
			},
			{ merge: true },
		);

		batch.set(surveyRef, {
			...survey,
			alumniUid: user.uid,
			createdAt: Timestamp.now(),
		});

		const analyticsRef = db
			.collection('analytics')
			.doc(userDoc.data()?.userCredentials.batch);
		const employmentField =
			survey?.employmentStatus === 'employed' ||
			survey?.employmentStatus === 'self-employed'
				? 'employed'
				: 'unemployed';

		batch.update(analyticsRef, {
			[employmentField]: FieldValue.increment(1),
			unknown: FieldValue.increment(-1),
		});

		await batch.commit();

		const alumniBatch = userDoc.data()?.userCredentials.batch;
		const startDate = alumniBatch - 1;

		await db.collection('users').doc(param).collection('education').add({
			schoolName: 'Central Philippines State University',
			schoolAddress: 'San Carlos City',
			createdAt: Timestamp.now(),
			startDate: startDate.toString(),
			endDate: alumniBatch,
		});

		return successResponse({
			message: 'Successfully updated personal account!',
		});
	} catch (error: any) {
		console.error('/alumni.put', error);
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
