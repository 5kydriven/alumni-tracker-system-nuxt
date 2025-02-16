export default function useSearch() {
	const q = useState('query', () => '');

	return { q };
}
