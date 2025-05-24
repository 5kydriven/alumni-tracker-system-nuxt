import { getFirestore, Query } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import drawHeader from '~~/server/utils/drawHeader';

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
		const alumni = snapshot.docs.map((doc) => doc.data());

		const doc = new PDFDocument({ margin: 50, size: 'A4' });

		// Convert PDFKit to stream for Nitro response
		const stream = Readable.from(doc as any);

		// Apply header on first page
		drawHeader(doc);

		// Apply header on every new page
		doc.on('pageAdded', () => {
			drawHeader(doc);
		});

		// Table headers
		doc.moveDown(1.5);
		doc.fontSize(12).font('Helvetica-Bold');
		doc.text('Name', 50, doc.y, { continued: true });
		doc.text('Course', 200, doc.y, { continued: true });
		doc.text('Batch', 350, doc.y);
		doc.moveDown(0.5);

		// Table body
		doc.font('Helvetica');
		alumni.forEach((alumni: User<AlumniCredentials>) => {
			doc.text(alumni.name || 'N/A', 50, doc.y, { continued: true });
			doc.text(alumni.userCredentials?.course || 'N/A', 200, doc.y, {
				continued: true,
			});
			doc.text(alumni.userCredentials?.batch || 'N/A', 350, doc.y);
			doc.moveDown();

			// Add page if near bottom
			if (doc.y > 700) doc.addPage();
		});

		doc.end();

		// Set headers
		setResponseHeaders(event, {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${filename}"`,
		});

		return stream;
	} catch (error: any) {
		console.error('PDF Export Backend Error:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to export alumni data to PDF',
			data: error instanceof Error ? error.message : String(error),
		});
	}
});
