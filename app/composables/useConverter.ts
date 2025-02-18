import {
	differenceInDays,
	differenceInHours,
	format,
	formatDistanceToNow,
	isSameWeek,
	isSameYear,
} from 'date-fns';
import type { Timestamp } from 'firebase/firestore';

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

	function convertConversationTimestamp(timestamp: Timestamp) {
		const seconds = timestamp.seconds;
		const nanoseconds = timestamp.nanoseconds;

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

	function convertMessagesTimestamp(timestamp: Timestamp) {
		const seconds = timestamp.seconds;
		const nanoseconds = timestamp.nanoseconds;

		const date = new Date(seconds * 1000 + nanoseconds / 1000000);
		const now = new Date();

		const hoursDifference = differenceInHours(now, date);
		const daysDifference = differenceInDays(now, date);

		if (hoursDifference < 24) {
			return format(date, 'hh:mm a');
		} else if (daysDifference < 7 && isSameWeek(date, now)) {
			return format(date, "EEE 'at' hh:mm a");
		} else if (isSameYear(date, now)) {
			return format(date, "MMM d 'at' hh:mm a");
		} else {
			return format(date, "MMM d, yyyy 'at' hh:mm a");
		}
	}

	return {
		convertTimestamp,
		convertToDate,
		convertConversationTimestamp,
		convertMessagesTimestamp,
	};
}
