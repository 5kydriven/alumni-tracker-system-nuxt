import { getFirestore } from 'firebase-admin/firestore';

const alumni: Alumni[] = [
	{
		id: 1,
		name: 'Anthony Fu',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 2,
		name: 'Sébastien Chopin',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'employed',
	},
	{
		id: 3,
		name: 'Benjamin Canac',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unknown',
	},
	{
		id: 4,
		name: 'Céline Dumerc',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 5,
		name: 'Daniel Roe',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 6,
		name: 'Farnabaz',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 7,
		name: 'Ferdinand Coumau',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 8,
		name: 'Florent Delerue',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 1,
		name: 'Baptiste Leproux',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 1,
		name: 'Pooya Parsa',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 9,
		name: 'Sarah Moriceau',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
	{
		id: 10,
		name: 'Sylvain Marroufin',
		email: 'example@gmail.com',
		course: 'BSIT',
		batch: 2025,
		status: 'unemployed',
	},
];

export default eventHandler(async (event) => {
	const db = getFirestore();
	try {
		const snapShot = await db.collection('alumni').get();

		const data = snapShot.docs.map((doc) => {
			return doc.data();
		});

		return data;
	} catch (error) {
		console.log('/api/registrar/alumni: ', error);
	}

	// const { q, status, sort, order } = getQuery(event) as {
	// 	q?: string;
	// 	status?: AlumniStatus[];
	// 	sort?: 'name' | 'email';
	// 	order?: 'asc' | 'desc';
	// };

	// return alumni
	// 	.filter((item) => {
	// 		if (!q) return true;

	// 		return (
	// 			item.name.search(new RegExp(q, 'i')) !== -1 ||
	// 			item.email.search(new RegExp(q, 'i')) !== -1
	// 		);
	// 	})
	// 	.filter((item) => {
	// 		if (!status?.length) return true;

	// 		return status.includes(item.status);
	// 	})
	// 	.sort((a, b) => {
	// 		if (!sort) return 0;

	// 		const aValue = a[sort];
	// 		const bValue = b[sort];

	// 		if (aValue < bValue) return order === 'asc' ? -1 : 1;
	// 		if (aValue > bValue) return order === 'asc' ? 1 : -1;
	// 		return 0;
	// 	});
});
