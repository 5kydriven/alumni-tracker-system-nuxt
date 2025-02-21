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

		const totalRegistrar = await db
			.collection('users')
			.where('role', '==', 'registrar')
			.count()
			.get();

		const totalJob = await db.collection('jobs').count().get();

		return {
			data: {
				alumni: totalAlumni.data().count,
				employer: totalEmployer.data().count,
				job: totalJob.data().count,
				registrar: totalRegistrar.data().count,
			},
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
