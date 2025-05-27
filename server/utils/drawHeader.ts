import { join } from 'path';

export default function drawHeader(doc: PDFKit.PDFDocument) {
	const logoSize = 40;
	const marginLeft = doc.page.margins.left; // 72
	const contentWidth = doc.page.width - marginLeft * 2; // 468 for LETTER
	const logoSpacing = 10;

	// Use absolute paths for logos
	const cpsuLogo = join(process.cwd(), 'public/assets/pdf-cpsu-logo.jpg');
	const bagongLogo = join(
		process.cwd(),
		'public/assets/bagong-pilipinas-logo.jpg',
	);
	const ccsLogo = join(process.cwd(), 'public/assets/ccs-logo.jpg');
	const arialNarrow = join(process.cwd(), 'public/fonts/arialnarrow.ttf');
	const arialNarrowBold = join(
		process.cwd(),
		'public/fonts/arialnarrow_bold.ttf',
	);
	const copperplateGothicBold = join(
		process.cwd(),
		'public/fonts/copperplategothic_bold.ttf',
	);

	// Draw logos starting from left margin
	doc.image(cpsuLogo, marginLeft, 30, { width: logoSize });
	doc.image(bagongLogo, marginLeft + logoSize + logoSpacing, 30, {
		width: logoSize,
	});
	doc.image(ccsLogo, marginLeft + (logoSize + logoSpacing) * 2, 30, {
		width: logoSize,
	});

	const dividerX = marginLeft + (logoSize + logoSpacing) * 3 + 10;

	// Add vertical line between logos and text
	doc.moveTo(dividerX, 30).lineTo(dividerX, 85).stroke();

	// Text block starts right after vertical divider
	const textX = dividerX + 10;

	doc
		.fontSize(10)
		.font(arialNarrow)
		.text('Republic of the Philippines', textX, 30, { align: 'left' })
		.fontSize(12)
		.fillColor('#4CAF50')
		.font(copperplateGothicBold)
		.text('CENTRAL PHILIPPINES STATE UNIVERSITY', textX, 43)
		.text('SAN CARLOS CAMPUS', textX, 56)
		.fillColor('black')
		.font(arialNarrow)
		.fontSize(10)
		.text('San Carlos City, Negros Occidental 6127', textX, 69)
		.fontSize(12)
		.font(arialNarrowBold)
		.text('COLLEGE OF COMPUTER STUDIES', textX, 82);

	// Horizontal divider
	doc
		.moveTo(marginLeft, 100)
		.lineTo(marginLeft + contentWidth, 100)
		.stroke();

	doc.y = 120;
}
