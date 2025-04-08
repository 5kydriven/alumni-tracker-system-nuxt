import { H3Event } from 'h3';
import { getFirestore, Query } from 'firebase-admin/firestore';
import ExcelJS from 'exceljs';

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

		const alumni = snapshot.docs.map((doc, index) => {
			const survey = doc.data().userCredentials?.survey || {};

			return {
				id: index + 1,
				lastname: doc.data().lastname.toUpperCase(),
				firstname: doc.data().firstname.toUpperCase(),
				middlename: doc.data().middlename.toUpperCase(),
				course: doc.data().userCredentials?.course,
				batch: doc.data().userCredentials?.batch,
				email: doc.data().email,
				status: doc.data().userCredentials?.status,
				employmentType: survey.employmentType || '',
				companyName: survey.companyName || '',
				companyAddress: survey.companyAddress || '',
				yearsInJob: survey.yearsInJob || '',
				workNature: survey.workNature || '',
				urlLink: survey.urlLink || '',
				bussinessName: survey.bussinessName || '',
				isRegistered: survey.isRegistered || '',
			};
		});

		// Create a new workbook
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Alumni Data');

		// Add header row
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 10 },
			{ header: 'Lastname', key: 'lastname', width: 30 },
			{ header: 'Firstname', key: 'firstname', width: 30 },
			{ header: 'Middlename', key: 'middlename', width: 30 },
			{ header: 'Course', key: 'course', width: 20 },
			{ header: 'Batch', key: 'batch', width: 10 },
			{ header: 'Email', key: 'email', width: 30 },
			{ header: 'Status', key: 'status', width: 15 },
			{ header: 'Employment Type', key: 'employmentType', width: 20 },
			{ header: 'Company Name', key: 'companyName', width: 30 },
			{ header: 'Company Address', key: 'companyAddress', width: 30 },
			{ header: 'Years in Job', key: 'yearsInJob', width: 15 },
			{ header: 'Work Nature', key: 'workNature', width: 20 },
			{ header: 'URL Link', key: 'urlLink', width: 30 },
			{ header: 'Business Name', key: 'bussinessName', width: 30 },
			{ header: 'Is Registered', key: 'isRegistered', width: 15 },
		];

		// Add rows
		alumni.forEach((alumnus) => {
			worksheet.addRow(alumnus);
		});

		// Set headers for Excel
		const safeFilename =
			typeof filename === 'string' && filename.endsWith('.xlsx')
				? filename
				: 'alumni_export.xlsx';

		setHeader(
			event,
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		);
		setHeader(
			event,
			'Content-Disposition',
			`attachment; filename="${safeFilename}"`,
		);

		// Stream the Excel file
		const buffer = await workbook.xlsx.writeBuffer();
		event.node.res.writeHead(200);
		event.node.res.end(buffer);
	} catch (error) {
		console.error('Excel Export Backend Error:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to export alumni data to Excel',
			data: error instanceof Error ? error.message : String(error),
		});
	}
});
