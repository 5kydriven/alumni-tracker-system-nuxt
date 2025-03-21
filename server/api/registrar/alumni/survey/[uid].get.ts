import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	try {
		const surveySnapshot = await db
			.collection('surveys')
			.where('alumniUid', '==', uid)
			.limit(1) // Ensures we only fetch one document
			.get();

		if (surveySnapshot.empty || !surveySnapshot.docs[0]) {
			return {
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Survey not found',
				data: null,
			} as H3Response;
		}

		const doc = surveySnapshot.docs[0];
		const survey = {
			...doc.data(),
			uid: doc.id,
		};

		return successResponse({ data: survey });
	} catch (error: any) {
		return errorResponse(error);
	}
});
