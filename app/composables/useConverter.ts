import { format, formatDistanceToNow } from 'date-fns';

export default function useConverter() {
	function convertTimestamp(timestamp: any) {
		const date = new Date(
			timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
		);

		return formatDistanceToNow(date, { addSuffix: true });
	}

	function convertToDate(timestamp: any) {
		const date = new Date(
			timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
		);

		return format(date, 'MMM d, yyyy');
	}

	return {
		convertTimestamp,
		convertToDate,
	};
}
