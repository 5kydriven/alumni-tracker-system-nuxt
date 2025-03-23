import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import type { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

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

		const batch = db.batch();
		let userRef = db.collection('users').doc(uid);

		const alumniDoc = await userRef.get();

		const alumni = alumniDoc.data() as User<AlumniCredentials>;

		if (alumni.role == 'alumni') {
			const analyticsRef = db
				.collection('analytics')
				.doc(alumni.userCredentials?.batch as string);

			if (
				alumni.userCredentials?.status == 'employed' ||
				alumni.userCredentials?.status == 'self-employed'
			) {
				batch.set(
					analyticsRef,
					{
						employed: FieldValue.increment(-1),
					},
					{ merge: true },
				);
			} else if (alumni.userCredentials?.status == 'unemployed') {
				batch.set(
					analyticsRef,
					{
						unemployed: FieldValue.increment(-1),
					},
					{ merge: true },
				);
			} else {
				batch.set(
					analyticsRef,
					{
						unknown: FieldValue.increment(-1),
					},
					{ merge: true },
				);
			}
		}

		const doc = await userRef.delete();

		const user = await getAuth().deleteUser(uid);

		return successResponse({
			message: 'Successfully deleted a user',
			data: [doc, user],
		});
	} catch (error: any) {
		console.log('userDelete: ', error);
		return errorResponse(error);
	}
});
