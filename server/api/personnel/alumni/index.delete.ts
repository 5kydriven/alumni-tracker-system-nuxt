import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody<User<AlumniCredentials>[]>(event);
	const db = getFirestore();
	const batch = db.batch();
	try {
		if (!body || body.length === 0) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No body provided',
			});
		}

		const alumnis = body.map((item) => ({
			uid: item.uid,
			status: item.userCredentials?.status,
			batch: String(item.userCredentials?.batch),
		}));

		for (const alumni of alumnis) {
			const userDocRef = db.collection('users').doc(alumni.uid as string);
			const alumniDocRef = db.collection('alumni').doc(alumni.uid as string);
			const analyticsRef = db.collection('analytics').doc(alumni.batch);

			batch.delete(userDocRef);
			batch.delete(alumniDocRef);
			switch (alumni.status?.toLowerCase()) {
				case 'employed':
					batch.set(
						analyticsRef,
						{
							employed: FieldValue.increment(-1),
						},
						{ merge: true },
					);
					break;
				case 'unemployed':
					batch.set(
						analyticsRef,
						{
							unemployed: FieldValue.increment(-1),
						},
						{ merge: true },
					);
					break;
				case 'unknown':
					batch.set(
						analyticsRef,
						{
							unknown: FieldValue.increment(-1),
						},
						{ merge: true },
					);
					break;
			}
		}

		const users = await getAuth().deleteUsers(
			alumnis.map((item) => item.uid || ''),
		);

		const result = await batch.commit();

		return successResponse({
			message: "Successfully deleted alumni's",
			data: [users, result],
		});
	} catch (error: any) {
		console.log('/personnel/alumni.delete', error);
		return errorResponse(error);
	}
});
