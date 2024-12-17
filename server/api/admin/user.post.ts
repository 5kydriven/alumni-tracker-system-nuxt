import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import type { User } from '~~/types/user';

export default defineEventHandler(async (event) => {
	const body = await readBody<User>(event);
	const db = getFirestore();
	try {
		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
		});

		await db.collection('users').doc(userDetails.uid).set(body);

		return {
			statusCode: 200,
			statusMessage: 'Successfully created user',
		};
	} catch (err: any) {
		console.log('userPost: ', err);
		return createError({
			statusCode: 400,
			statusMessage: 'Something went wrong!',
		});
	}
});
