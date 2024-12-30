import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const db = getFirestore();

	const user = await getAuth().updateUser(body, {
		email: '',
		password: '',
		phoneNumber: '',
	});

	await db.collection('alumni').doc(body.uid).set(body);

	return user;
});
