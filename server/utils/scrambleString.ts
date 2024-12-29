export default function scrambleString(str: string) {
	const characters = str.split('');
	for (
		let currentIndex = characters.length - 1;
		currentIndex > 0;
		currentIndex--
	) {
		const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
		[characters[currentIndex], characters[randomIndex]] = [
			characters[randomIndex],
			characters[currentIndex],
		];
	}
	return characters.join('');
}
