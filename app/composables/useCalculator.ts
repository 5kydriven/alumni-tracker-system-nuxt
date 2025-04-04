export default function useCalculator() {
	function calculateDuration(from: ExperienceDate, to: ExperienceDate) {
		let totalMonths =
			(Number(to.year) - Number(from.year)) * 12 +
			(Number(to.month) - Number(from.month));
		let years = Math.floor(totalMonths / 12);
		let months = totalMonths % 12;

		let result = [];
		if (years > 0) result.push(`${years} yr${years > 1 ? 's' : ''}`);
		if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);

		return result.length > 0 ? result.join(' ') : '0 months';
	}

	return {
		calculateDuration,
	};
}
