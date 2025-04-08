import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');
	const body = await readBody<{
		alumni: User<AlumniCredentials>;
		survey: Survey;
	}>(event);

	try {
		const { alumni, survey } = body;
		const { createdAt, alumniUid, updatedAt, ...newSurvey } = survey;

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
			userCredentials: {
				survey: {
					...newSurvey,
					updatedAt: Timestamp.now(),
				},
			},
			searchKeywords: generateSearchKeywords(alumni.name as string),
			updatedAt: Timestamp.now(),
		};

		const alumniPromise = await db
			.collection('users')
			.doc(uid)
			.set(alumniUpdate, { merge: true });

		// Handle survey update
		if (survey.employmentStatus != 'unknown') {
			const surveyQuery = await db
				.collection('surveys')
				.where('alumniUid', '==', uid)
				.limit(1)
				.get();

			let previousEmploymentStatus = 'unknown';

			if (surveyQuery.empty) {
				// No existing survey, create a new one
				await db
					.collection('surveys')
					.doc()
					.set({
						...survey,
						employmentStatus: alumni.userCredentials?.status,
						createdAt: Timestamp.now(),
					});
			} else {
				const surveyDoc = surveyQuery.docs[0];
				const surveyData = surveyDoc?.data();
				previousEmploymentStatus = surveyData?.employmentStatus || 'unknown';

				const surveyUpdate = {
					...survey,
					employmentStatus: alumni.userCredentials?.status,
					updatedAt: Timestamp.now(),
				};

				await db
					.collection('surveys')
					.doc(surveyDoc?.id as string)
					.update(surveyUpdate);
			}

			// Map previous and new employment fields
			const mapEmploymentField = (status: string) => {
				if (status === 'employed' || status === 'self-employed')
					return 'employed';
				if (status === 'unemployed') return 'unemployed';
				return 'unknown';
			};

			const previousField = mapEmploymentField(previousEmploymentStatus);
			const newField = mapEmploymentField(alumni.userCredentials?.status ?? '');

			// Only update analytics if the employment field actually changed
			if (previousField !== newField) {
				const batchDoc = db
					.collection('analytics')
					.doc(alumni.userCredentials?.batch ?? '');

				const updates: any = {};

				// Decrement previous field if not unknown
				if (previousField !== 'unknown') {
					updates[previousField] = FieldValue.increment(-1);
				}

				// Increment new field if not unknown
				if (newField !== 'unknown') {
					updates[newField] = FieldValue.increment(1);
				}

				await batchDoc.update(updates);
			}
		}

		return successResponse({
			message: 'Successfully updated alumni data',
			data: alumniPromise,
		});
	} catch (error: any) {
		console.error('/api/personnel/alumni/[uid].put ', error);
		return errorResponse(error);
	}
});
