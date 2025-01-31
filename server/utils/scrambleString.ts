export default function scrambleString(str: string) {
	const characters: string[] = str.split('');
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
