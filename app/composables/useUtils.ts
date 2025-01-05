import type { Timestamp } from 'firebase/firestore';

export default function useUtils() {
	async function getRole() {
		const user = await getCurrentUser();
		const { data: role } = await useLazyFetch('/api/role', {
			method: 'POST',
			body: JSON.stringify({ uid: user.uid }),
		});
		return role.value;
	}

	function convertFirebaseTimestamp(timestamp: Timestamp) {
		return timestamp.toDate();
	}

	return {
		convertFirebaseTimestamp,
		getRole,
	};
}
