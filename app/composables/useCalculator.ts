export default function useCalculator() {
	function calculateDuration(
		from: { month: number; year: number },
		to: { month: number; year: number },
	) {
		let totalMonths = (to.year - from.year) * 12 + (to.month - from.month);
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
