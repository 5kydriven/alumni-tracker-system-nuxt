import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event: H3Event) => {
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();
	const body = await readBody<{
		user: User;
		survey: Survey;
	}>(event);

	try {
		const { user, survey } = body;
		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required uid',
			});
		}

		if (!body) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required body',
			});
		}

		const userDoc = await db
			.collection('users')
			.doc(uid)
			.update({
				...user,
				updatedAt: Timestamp.now(),
				searchKeywords: generateSearchKeywords(user.name as string),
			});

		// Handle survey update
		if (
			user.userCredentials != 'unknown' ||
			user.userCredentials != 'unemployed'
		) {
			const surveyQuery = await db
				.collection('surveys')
				.where('alumniUid', '==', uid)
				.limit(1)
				.get();

			if (surveyQuery.empty) {
				await db
					.collection('surveys')
					.doc()
					.set({
						...survey,
						employmentStatus: user.userCredentials?.status,
						createdAt: Timestamp.now(),
					});
			} else {
				const surveyDoc = surveyQuery.docs[0];
				const surveyUpdate = {
					...survey,
					employmentStatus: user.userCredentials?.status,
					updatedAt: Timestamp.now(),
				};

				await db
					.collection('surveys')
					.doc(surveyDoc?.id as string)
					.update(surveyUpdate);
			}

			const employmentField =
				user.userCredentials?.status === 'employed' ||
				user.userCredentials?.status === 'self-employed'
					? 'employed'
					: 'unemployed';

			await db
				.collection('analytics')
				.doc(user.userCredentials?.batch ?? '')
				.update({
					[employmentField]: FieldValue.increment(1),
					unknown: FieldValue.increment(-1),
				});
		}

		return successResponse({
			message: 'Successfully updated user',
			data: userDoc,
		});
	} catch (error) {
		return errorResponse(error);
	}
});
