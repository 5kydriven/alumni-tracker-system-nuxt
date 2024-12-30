import { camelize } from '@vueuse/core';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default eventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const db = getFirestore();
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
				batch.set(docRef, {
					...item,
					email,
					password,
					uid: userCreds.uid,
					isUpdated: false,
					createdAt: Timestamp.now(),
				});

				const accountRolesDocRef = db.collection('users').doc(userCreds.uid);
				batch.set(accountRolesDocRef, {
					role: 'alumni',
					created_at: Timestamp.now(),
				});

				return { ...item, email, password, uid: userCreds.uid };
			}),
		);

		await batch.commit();
		return {
			status: 200,
			message: 'Successfully created alumni',
			body: result,
		};
	} catch (error: any) {
		console.error('registrar/alumni.post', error);
		return {
			status: 400,
			message: 'Something went wrong',
			body: error,
		};
	}
});
