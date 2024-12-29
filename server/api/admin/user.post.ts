import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = getFirestore();
	try {
		const userDetails = await getAuth().createUser({
			email: body.email,
			password: body.password,
		});

		await db.collection('users').doc(userDetails.uid).set({
			role: body.role,
		});

		await db
			.collection(body.role)
			.doc(userDetails.uid)
			.set({ ...body, uid: userDetails.uid });

		return {
			statusCode: 200,
			statusMessage: 'Successfully created user',
			body: { ...body, uid: userDetails.uid },
		};
	} catch (err: any) {
		console.log('/admin/usesPost: ', err);
		return {
			statusCode: 400,
			statusMessage: err.message,
		};
	}
});
