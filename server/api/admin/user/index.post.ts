import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = getFirestore();
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'Body has no content',
			});
		}

		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
			displayName: body.name,
		});

		const userRef = await db
			.collection('users')
			.doc(userDetails.uid)
			.set(
				{
					...body,
					createdAt: Timestamp.now(),
					searchKeywords: generateSearchKeywords(body.name),
				},
				{ merge: true },
			);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully created user',
			data: userRef,
		} as H3Response;
	} catch (error: any) {
		console.log('/admin/usesPost: ', error);
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
