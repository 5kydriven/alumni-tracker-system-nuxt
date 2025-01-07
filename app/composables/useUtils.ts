export default function useUtils() {
	const role = useState('user-role', () => null);
	async function getRole(uid: string) {
		const { data } = await useFetch(`/api/role/${uid}`);
		role.value = data.value;
		return role.value;
	}

	return {
		role,
		getRole,
	};
}
