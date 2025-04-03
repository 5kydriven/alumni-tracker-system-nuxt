import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	try {
		const totalAlumni = await db
			.collection('users')
			.where('role', '==', 'alumni')
			.count()
			.get();

		const totalemployed = await db
			.collection('users')
			.where('role', '==', 'alumni')
			.where('userCredentials.status', 'in', ['employed', 'self-employed'])
			.count()
			.get();

		const totalunemployed = await db
			.collection('users')
			.where('role', '==', 'alumni')
			.where('userCredentials.status', '==', 'unemployed')
			.count()
			.get();

		const totalunknown = await db
			.collection('users')
			.where('role', '==', 'alumni')
			.where('userCredentials.status', '==', 'unknown')
			.count()
			.get();

		return successResponse({
			data: {
				alumni: totalAlumni.data().count,
				employed: totalemployed.data().count,
				unemployed: totalunemployed.data().count,
				unknown: totalunknown.data().count,
			},
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
