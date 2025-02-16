import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');

	try {
		if (!uid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No uid provided',
			});
		}
		const userRef = db.collection('users').doc(uid);
		const [docSnap, educationSnap, experienceSnap] = await Promise.all([
			userRef.get(),
			userRef.collection('educationHistory').get(),
			userRef.collection('workExperience').get(),
		]);

		if (!docSnap.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Alumni not found',
			});
		}

		const education = educationSnap.empty
			? null
			: educationSnap.docs.map((item) => ({ ...item.data(), uid: item.id }));
		const experience = experienceSnap.empty
			? null
			: experienceSnap.docs.map((item) => ({ ...item.data(), uid: item.id }));

		const userData = docSnap.data();
		const existingCredentials = userData?.userCredentials || {};

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: {
				...userData,
				uid: docSnap.id,
				userCredentials: {
					...existingCredentials,
					educationalBackground: education,
					workExperience: experience,
				},
			},
		} as H3Response;
	} catch (error) {
		console.error('/alumni.[uid].get:', error);
		return errorResponse(error);
	}
});
