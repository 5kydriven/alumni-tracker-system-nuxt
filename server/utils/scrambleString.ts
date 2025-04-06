export default function scrambleString(str: string) {
	// Remove spaces and split into characters
	const updatedStr = str.replace(/\s+/g, '');
	const characters: string[] = updatedStr.split('');

	// Generate two random numbers (0-9)
	const randomNum1 = Math.floor(Math.random() * 10);
	const randomNum2 = Math.floor(Math.random() * 10);

	// Combine letters and numbers into one array
	const combinedArray = [
		...characters,
		randomNum1.toString(),
		randomNum2.toString(),
	];

	// Perform Fisher-Yates shuffle on the combined array
	for (
		let currentIndex = combinedArray.length - 1;
		currentIndex > 0;
		currentIndex--
	) {
		const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
		[combinedArray[currentIndex], combinedArray[randomIndex]] = [
			combinedArray[randomIndex] as string,
			combinedArray[currentIndex] as string,
		];
	}

	return combinedArray.join('');
}
