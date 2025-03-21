import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	try {
		const body = await readBody<{
			alumni: User<AlumniCredentials>;
			survey: Survey;
		}>(event);
		const { alumni, survey } = body;

		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'UID is required',
			});
		}

		if (!alumni || typeof alumni !== 'object') {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'Valid alumni data is required',
			});
		}

		const alumniUpdate = {
			...alumni,
			searchKeywords: generateSearchKeywords(alumni.name as string),
			updatedAt: Timestamp.now(),
		};

		const alumniPromise = await db
			.collection('users')
			.doc(uid)
			.update(alumniUpdate);

		// Handle survey update
		if (survey.employmentStatus != 'unknown') {
			const surveyQuery = await db
				.collection('surveys')
				.where('alumniUid', '==', uid)
				.limit(1)
				.get();

			if (surveyQuery.empty) {
				throw createError({
					statusCode: 404,
					statusMessage: 'Not Found',
					message: 'No survey found for this alumni',
				});
			}

			const surveyDoc = surveyQuery.docs[0];
			const surveyUpdate = {
				...survey,
				updatedAt: Timestamp.now(),
			};

			await db
				.collection('surveys')
				.doc(surveyDoc?.id as string)
				.update(surveyUpdate);

			const employmentField =
				survey?.employmentStatus === 'employed' ||
				survey?.employmentStatus === 'self-employed'
					? 'employed'
					: 'unemployed';

			await db
				.collection('analytics')
				.doc(alumni.userCredentials?.batch ?? '')
				.update({
					[employmentField]: FieldValue.increment(1),
					unknown: FieldValue.increment(-1),
				});
		}

		console.log(alumni, survey);

		return successResponse({
			message: 'Successfully updated alumni data',
			data: alumniPromise,
		});
	} catch (error: any) {
		console.error('/api/registrar/alumni/[uid].put ', error);
		return errorResponse(error);
	}
});
