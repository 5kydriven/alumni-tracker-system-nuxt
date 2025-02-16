export const useSearchStore = defineStore('search-store', () => {
	const q = ref();

	return {
		q,
	};
});
