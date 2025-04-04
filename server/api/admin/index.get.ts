import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	try {
		const totalAlumni = await db
			.collection('users')
			.where('role', '==', 'alumni')
			.count()
			.get();

		const totalEmployer = await db
			.collection('users')
			.where('role', '==', 'employer')
			.count()
			.get();

		const totalPersonnel = await db
			.collection('users')
			.where('role', '==', 'personnel')
			.count()
			.get();

		const totalJob = await db.collection('jobs').count().get();

		return {
			data: {
				alumni: totalAlumni.data().count,
				employer: totalEmployer.data().count,
				job: totalJob.data().count,
				personnel: totalPersonnel.data().count,
			},
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
