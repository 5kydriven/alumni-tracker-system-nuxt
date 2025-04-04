import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import successResponse from '~~/server/utils/okReponse';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();

	try {
		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Missing uid',
			});
		}

		const userDoc = await db.collection('users').doc(uid).get();

		const alumni = userDoc.data() as User<AlumniCredentials>;
		const batch = db.batch();

		const analyticsRef = db
			.collection('analytics')
			.doc(alumni.userCredentials?.batch as string);

		batch.delete(db.collection('users').doc(uid));

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

		const result = await batch.commit();

		const user = await getAuth().deleteUser(uid);

		return successResponse({
			message: 'Successfully deleted user',
			data: [result, user],
		});
	} catch (error: any) {
		console.log('/personnel/alumni.delete: ', error);
		return errorResponse(error);
	}
});
