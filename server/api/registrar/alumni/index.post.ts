import { H3Event } from 'h3';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody(event);
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'Body has no content',
			});
		}

		const batch = db.batch();
		const password = '123456';

		const result = await Promise.all(
			body.map(async (item: any) => {
				const name = item.name.split(' ');
				const lastName = name[name.length - 1];
				const scrambledLastName = scrambleString(lastName);
				const email = `${
					scrambledLastName.toLowerCase() + item.batch
				}cpsu@example.com`;

				const userCreds = await getAuth().createUser({
					email,
					password,
					displayName: item.name,
				});

				const docRef = db.collection('alumni').doc(userCreds.uid);
				batch.set(
					docRef,
					{
						...item,
						email,
						password,
						isUpdated: false,
						createdAt: Timestamp.now(),
					},
					{ merge: true },
				);

				const accountRolesDocRef = db.collection('users').doc(userCreds.uid);
				batch.set(
					accountRolesDocRef,
					{
						role: 'alumni',
						email,
						password,
						name: item.name,
						createdAt: Timestamp.now(),
						userCredentials: {
							batch: item.batch,
							course: item.course,
							isUpdated: false,
						},
					},
					{ merge: true },
				);

				return { ...item, email, password, uid: userCreds.uid };
			}),
		);

		await batch.commit();

		return {
			statusCode: 200,
			statusMessage: 'success',
			message: 'Successfully created alumni',
			data: result,
		} as H3Response;
	} catch (error: any) {
		console.error('/registrar/alumni.post', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'Conflict',
				message: 'Email already exists',
				data: error,
			});
		}
		return errorResponse(error);
	}
});
