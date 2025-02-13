export default function useFormatter() {
	function formatMonthYear({ month, year }: { month: number; year: number }) {
		const date = new Date(year, month);
		const formattedDate = date.toLocaleString('en-US', {
			month: 'short',
			year: 'numeric',
		});

		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		return year === currentYear && month === currentMonth
			? 'Present'
			: formattedDate;
	}

	return {
		formatMonthYear,
	};
}
