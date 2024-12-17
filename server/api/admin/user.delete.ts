import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const db = getFirestore();
	const { uid } = await readBody(event);

	try {
		await getAuth().deleteUser(uid?.toString() ?? '');

		const docRes = await db
			.collection('users')
			.doc(uid?.toString() ?? '')
			.delete();

		return {
			statusCode: 200,
			statusMessage: 'Successfully deleted a user',
		};
	} catch (err: any) {
		console.log('userDelete: ', err);
		return createError({
			statusCode: 400,
			statusMessage: 'Something went wrong!',
		});
	}
});
