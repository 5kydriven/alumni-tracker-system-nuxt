export default function generateSearchKeywords(name: string) {
	const keywords = new Set();

	keywords.add(name.toLowerCase());

	const words = name.toLowerCase().split(' ');

	if (words.length > 1) {
		words.forEach((word) => {
			keywords.add(word + ' ');
		});
	}

	words.forEach((word) => {
		keywords.add(word);
	});

	words.forEach((word) => {
		let prefix = '';
		for (const char of word) {
			prefix += char;
			keywords.add(prefix);
		}
	});

	return Array.from(keywords);
}
