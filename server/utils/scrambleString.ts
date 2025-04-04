export default function scrambleString(str: string) {
	const updatedStr = str
		.replace('�', 'ñ') // Replace all occurrences of � with ñ
		.replace(/\s+/g, ''); // Remove all spaces
	const characters: string[] = updatedStr.split('');
	for (
		let currentIndex = characters.length - 1;
		currentIndex > 0;
		currentIndex--
	) {
		const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
		[characters[currentIndex], characters[randomIndex]] = [
			characters[randomIndex] as string,
			characters[currentIndex] as string,
		];
	}
	return characters.join('');
}
