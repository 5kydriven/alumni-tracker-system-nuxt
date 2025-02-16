export const useQueueStore = defineStore('queue-store', () => {
	const q = ref('');
	const page = ref(1);
	const limit = ref(20);

	// getters
	const offset = computed(() => (page.value - 1) * limit.value);

	const query = computed(() => ({
		q: q.value,
		limit: limit.value,
		offset: offset.value,
	}));

	return {
		q,
		page,
		limit,
		offset,
		query,
	};
});
