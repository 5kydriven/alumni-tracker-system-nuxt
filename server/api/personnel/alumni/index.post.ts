import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';
import sanitizeString from '~~/server/utils/snitizeString';
import { H3Event } from 'h3';
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);

	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'Body has no content',
			});
		}

		const batch = db.batch();
		const password = '123456';

		const result = await Promise.all(
			body.map(
				async (item: { name: string; batch: string; course: string }) => {
					const arrange = rearrangeName(item.name);
					const name = arrange.trim().split(' ');
					const lastName = sanitizeString(name[name.length - 1] || 'unknown');
					const scrambledLastName = scrambleString(lastName as string);
					const email = `${scrambledLastName.toLowerCase()}${
						item.batch
					}cpsu@example.com`;

					const userCreds = await getAuth().createUser({
						email,
						password,
						displayName: arrange,
					});

					const accountRolesDocRef = db.collection('users').doc(userCreds.uid);
					batch.set(
						accountRolesDocRef,
						{
							role: 'alumni',
							email,
							password,
							name: arrange.toLowerCase(),
							searchKeywords: generateSearchKeywords(arrange),
							createdAt: Timestamp.now(),
							updatedAt: Timestamp.now(),
							isUpdated: false,
							userCredentials: {
								status: 'unknown',
								course: item.course.toUpperCase(),
								batch: item.batch,
								description: null,
							},
						},
						{ merge: true },
					);

					return {
						...item,
						email,
						password,
						uid: userCreds.uid,
					};
				},
			),
		);

		// Update analytics for the single batch (outside the loop)
		const batchValue = body[0].batch; // All items have the same batch
		const analyticsRef = db.collection('analytics').doc(batchValue);
		batch.set(
			analyticsRef,
			{
				year: Number(batchValue),
				employed: FieldValue.increment(0),
				unemployed: FieldValue.increment(0),
				unknown: FieldValue.increment(body.length), // Increment by 38 once
			},
			{ merge: true },
		);

		await batch.commit();
		const cache = useStorage('cache');
		await cache.clear();

		return successResponse({
			message: 'Successfully created alumni',
			data: result,
		});
	} catch (error: any) {
		console.error('/personnel/alumni.post', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'conflict',
				message: 'Email already exists',
				data: error,
			});
		}
		return errorResponse(error);
	}
});
