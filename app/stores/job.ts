export const useJobStore = defineStore('jobStore', () => {
	const jobs = ref<Job[]>([]);
	const isLoading = ref(false);

	function fetchJobs() {}

	function createJob(job: Job) {
		console.log('Job created: ', job);
		jobs.value.push(job);
	}

	function updateJob(job: Job) {}

	function deleteJob(uid: string) {}

	return {
		jobs,
		isLoading,
		fetchJobs,
		createJob,
		deleteJob,
	};
});
