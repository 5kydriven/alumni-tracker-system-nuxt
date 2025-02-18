import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import generateSearchKeywords from '~~/server/utils/searchKeywords';
import rearrangeName from '~~/server/utils/rearrangeName';

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
					const lastName = name[name.length - 1];
					const scrambledLastName = scrambleString(lastName as string);
					const email = `${
						scrambledLastName.toLowerCase() + item.batch
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

					return { ...item, email, password, uid: userCreds.uid };
				},
			),
		);

		await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully created alumni',
			data: result,
		} as H3Response;
	} catch (error: any) {
		console.error('/registrar/alumni.post', error);
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
