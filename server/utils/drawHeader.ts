import { join } from 'path';

export default function drawHeader(doc: PDFKit.PDFDocument) {
	// Logo sizes
	const logoSize = 30;

	// Use absolute paths for logos
	const cpsuLogo = join(process.cwd(), 'public/assets/pdf-cpsu-logo.jpg');
	const bagongLogo = join(
		process.cwd(),
		'public/assets/bagong-pilipinas-logo.jpg',
	);
	const ccsLogo = join(process.cwd(), 'public/assets/ccs-logo.jpg');

	// Draw logos
	doc.image(cpsuLogo, 50, 30, { width: logoSize });
	doc.image(bagongLogo, 130, 30, { width: logoSize });
	doc.image(ccsLogo, 210, 30, { width: logoSize });

	// Text content
	doc
		.fontSize(10)
		.text('Republic of the Philippines', 300, 30, { align: 'left' })
		.fontSize(12)
		.fillColor('#4CAF50') // Green
		.font('Helvetica-Bold')
		.text('CENTRAL PHILIPPINES STATE UNIVERSITY', 300)
		.text('SAN CARLOS CAMPUS', 300)
		.fillColor('black')
		.font('Helvetica')
		.fontSize(10)
		.text('San Carlos City, Negros Occidental 6127', 300)
		.font('Helvetica-Bold')
		.text('COLLEGE OF COMPUTER STUDIES', 300);

	// Horizontal divider
	doc.moveTo(50, 100).lineTo(545, 100).stroke();

	doc.moveDown(3);
}
