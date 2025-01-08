export default function useUtils() {
	const role = useState('user-role', () => null);
	function setRole(payload: string) {
		role.value = payload;
	}

	return {
		role,
		setRole,
	};
}
