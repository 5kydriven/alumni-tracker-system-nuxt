import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { status } = getQuery(event);

	try {
		const courses = [
			'BSIT',
			'BSCRIM',
			'BSHM',
			'BSAB',
			'BEED',
			'BSED-SCI',
			'BSED-MATH',
		];
		const results: any[] = [];
		let countSnap;
		for (const course of courses) {
			if (status != 'employed') {
				countSnap = await db
					.collection('users')
					.where('role', '==', 'alumni')
					.where('userCredentials.course', '==', course)
					.where('userCredentials.status', '==', status)
					.count()
					.get();
			} else {
				countSnap = await db
					.collection('users')
					.where('role', '==', 'alumni')
					.where('userCredentials.course', '==', course)
					.where('userCredentials.status', 'in', ['employed', 'self-employed'])
					.count()
					.get();
			}

			results.push({ label: course, value: countSnap.data().count });
		}

		return successResponse({ data: results });
	} catch (error: any) {
		return errorResponse(error);
	}
});
