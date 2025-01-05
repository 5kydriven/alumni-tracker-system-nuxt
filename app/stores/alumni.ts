export const useAlumniStore = defineStore('alumniStore', () => {
	const jobs = ref<Job[]>([]);
	const isLoading = ref(false);

	async function fetchJobs() {
		const res = await $fetch<Job[]>('/api/job', { method: 'GET' });
		jobs.value = res;
	}

	return {
		jobs,
		isLoading,
		fetchJobs,
	};
});
