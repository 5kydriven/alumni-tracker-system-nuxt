// /server/api/registrar/alumni/export.ts
import { H3Event } from 'h3';
import { getFirestore, Query } from 'firebase-admin/firestore';
import { stringify } from 'csv-stringify';

export default eventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { courses, statuses, batch, filename } = getQuery(event);

	try {
		let queryRef: Query = db
			.collection('users')
			.where('role', '==', 'alumni')
			.orderBy('userCredentials.course', 'asc')
			.orderBy('name', 'asc');

		const toStringArray = (value: unknown): string[] => {
			if (typeof value === 'string') {
				return value.split(',');
			}
			if (Array.isArray(value)) {
				return value.map(String);
			}
			return [];
		};

		if (courses)
			queryRef = queryRef.where(
				'userCredentials.course',
				'in',
				toStringArray(courses),
			);
		if (statuses)
			queryRef = queryRef.where(
				'userCredentials.status',
				'in',
				toStringArray(statuses),
			);
		if (batch)
			queryRef = queryRef.where(
				'userCredentials.batch',
				'in',
				toStringArray(batch),
			);

		const snapshot = await queryRef.get();

		const alumni = snapshot.docs.map((doc, index) => ({
			id: index + 1,
			name: doc.data().name,
			course: doc.data().userCredentials?.course,
			batch: doc.data().userCredentials?.batch,
			status: doc.data().userCredentials?.status,
		}));

		setHeader(event, 'Content-Type', 'text/csv');
		const safeFilename =
			typeof filename === 'string' && filename.endsWith('.csv')
				? filename
				: 'alumni_export.csv';
		setHeader(
			event,
			'Content-Disposition',
			`attachment; filename="${safeFilename}"`,
		);

		const csvStringifier = stringify({
			header: true,
			columns: ['id', 'name', 'course', 'batch', 'status'],
		});

		event.node.res.writeHead(200);
		csvStringifier.pipe(event.node.res);

		alumni.forEach((row) => csvStringifier.write(row));
		csvStringifier.end();

		return new Promise((resolve) => csvStringifier.on('end', resolve));
	} catch (error) {
		console.error('CSV Export Backend Error:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to export alumni data to CSV',
			data: error instanceof Error ? error.message : String(error),
		});
	}
});
