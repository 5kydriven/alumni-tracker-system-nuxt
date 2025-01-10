import {
	differenceInDays,
	differenceInHours,
	format,
	formatDistanceToNow,
} from 'date-fns';

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

	function convertConversationTimestamp(timestamp: any) {
		const seconds = timestamp.seconds || timestamp._seconds;
		const nanoseconds = timestamp.nanoseconds || timestamp._nanoseconds;

		const date = new Date(seconds * 1000 + nanoseconds / 1000000);

		const now = new Date();
		const hoursDifference = differenceInHours(now, date);
		const daysDifference = differenceInDays(now, date);

		if (hoursDifference < 24) {
			return format(date, 'hh:mm a');
		} else if (daysDifference < 7) {
			return format(date, 'EEE');
		} else {
			return format(date, 'MMM d');
		}
	}

	return {
		convertTimestamp,
		convertToDate,
		convertConversationTimestamp,
	};
}
