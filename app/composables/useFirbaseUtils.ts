import { doc, getDoc, type Firestore } from 'firebase/firestore';

export default function useUtils() {
	const role = useState('user-role', () => null);

	async function getUserCredentials(db: Firestore, uid: string) {
		const docSnap = await getDoc(doc(db, 'users', uid));
		role.value = docSnap.data().role;
		const userCreds = await getDoc(doc(db, docSnap.data().role, uid));

		return { ...userCreds.data(), uid: userCreds.id };
	}

	function getParticipantsInfo() {}

	return {
		role,
		getUserCredentials,
	};
}
