import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { q, limit = 10, offset = 0, role } = getQuery(event);

	try {
		let usersQuery = db.collection('users').orderBy('name', 'asc');

		if (q) {
			usersQuery = usersQuery.where(
				'searchKeywords',
				'array-contains',
				q.toString().toLowerCase(),
			);
		}

		if (role) {
			const roleArray = Array.isArray(role) ? role : [role];
			usersQuery = usersQuery.where('role', 'in', roleArray);
		}

		usersQuery = usersQuery.limit(Number(limit)).offset(Number(offset));

		const [snapShot, countSnap] = await Promise.all([
			usersQuery.get(),
			db.collection('users').where('role', '!=', 'admin').count().get(),
		]);

		const users = snapShot.docs.map((doc, index) => ({
			...doc.data(),
			uid: doc.id,
			id: index + Number(offset),
		})) as User[];

		return {
			total: countSnap.data().count || 0,
			data: users,
		} as PaginatedResponse;
	} catch (error) {
		console.error('Error in /admin/user.get:', error);
	}
});
