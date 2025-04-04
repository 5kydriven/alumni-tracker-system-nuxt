export default function generateSearchKeywords(name: string) {
	const keywords = new Set<string>(); // Explicitly type the Set
	const words = name.toLowerCase().split(' ');

	// Add the whole name
	keywords.add(name.toLowerCase());

	// Generate prefixes for each word individually
	words.forEach((word) => {
		let prefix = '';
		for (const char of word) {
			prefix += char;
			keywords.add(prefix);
		}
	});

	// Add combinations of "test" with prefixes of "account" if second word exists
	if (words.length > 1 && words[1]) {
		let secondWordPrefix = '';
		for (const char of words[1]) {
			secondWordPrefix += char;
			keywords.add(words[0] + ' ' + secondWordPrefix);
		}
	}

	// Add combinations of "test account" with prefixes of "personnel" if third word exists
	if (words.length > 2 && words[2]) {
		let thirdWordPrefix = '';
		for (const char of words[2]) {
			thirdWordPrefix += char;
			keywords.add(words[0] + ' ' + words[1] + ' ' + thirdWordPrefix);
		}
	}

	return Array.from(keywords);
}
