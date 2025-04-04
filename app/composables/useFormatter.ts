export default function useFormatter() {
	function formatMonthYear({ month, year }: ExperienceDate) {
		const date = new Date(Number(year), Number(month));
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

	function capitalCase(key: any) {
		return key
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str: string) => str.toUpperCase());
	}

	return {
		formatMonthYear,
		capitalCase,
	};
}
