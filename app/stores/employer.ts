export const useEmployerStore = defineStore('employerStore', () => {
	const jobs = ref<Job[]>();

	function fetchJobs() {}

	function createJob() {}

	function deleteJob() {}

	return {
		jobs,
		fetchJobs,
		createJob,
		deleteJob,
	};
});
