import { getFirestore, Query } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import PDFDocument from 'pdfkit-table';
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

		const tableData = alumni.map((alumni: User<AlumniCredentials>) => [
			alumni.name || 'N/A',
			alumni.userCredentials?.course || 'N/A',
			alumni.userCredentials?.batch || 'N/A',
			alumni.userCredentials?.status || 'N/A',
		]);

		const tableHeaders = ['Name', 'Course', 'Batch', 'Status'];

		const doc = new PDFDocument({ margin: 72, size: 'LETTER' }); // Reduced margin to 30
		const stream = Readable.from(doc as any);

		// Calculate table width to use more page space
		const pageWidth = doc.page.width; // 612 for LETTER
		const margin = doc.page.margins.left; // 30
		const tableWidth = pageWidth - 2 * margin; // 612 - 2 * 30 = 552
		const x = margin; // Start table at left margin
		console.log('Table width:', tableWidth);

		// Constants for pagination
		const startY = 120; // Y position where table starts (below header)
		const rowHeight = 20; // Reduced row height for more rows per page
		const pageHeight = doc.page.height - doc.page.margins.bottom; // 792 - 30 = 762
		const rowsPerPage = Math.floor((pageHeight - startY - 20) / rowHeight); // Extra 20 for buffer

		// Draw header for first page
		drawHeader(doc);

		// Manual pagination
		for (let i = 0; i < tableData.length; i += rowsPerPage) {
			const currentPageRows = tableData.slice(i, i + rowsPerPage);

			// Render table for current page
			doc.table(
				{
					headers: tableHeaders,
					rows: currentPageRows,
				},
				{
					x,
					y: startY,
					columnsSize: [240, 70, 60, 98],
					width: tableWidth,
				},
			);

			// Add new page if there are more rows
			if (i + rowsPerPage < tableData.length) {
				doc.addPage();
				drawHeader(doc);
			}
		}

		doc.end();

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
