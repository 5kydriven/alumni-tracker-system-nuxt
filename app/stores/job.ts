import messages from '~~/server/api/messages';

export const useJobStore = defineStore('jobStore', () => {
	const jobs = ref<Job[]>([]);
	const isLoading = ref(false);

	async function fetchJobs() {
		const res = await $fetch<Job[]>('/api/job', { method: 'GET' });
		jobs.value = res;
	}

	async function createJob(job: Job) {
		isLoading.value = true;

		const res = await $fetch<H3Response>('/api/job', {
			method: 'POST',
			body: JSON.stringify(job),
		});

		jobs.value.push({ ...job, uid: res.data.uid });
		console.log('Job created: ', res);
		isLoading.value = false;
		return res;
	}

	function updateJob(job: Job) {}

	async function deleteJob(uid: string) {
		isLoading.value = true;
		try {
			const res = await $fetch(`/api/job/${uid}`, {
				method: 'DELETE',
			});
			jobs.value = jobs.value.filter((job) => job.uid !== uid);
			return res;
		} catch (error: any) {
			return {
				statusCode: error.statusCode,
				statusMessage: error.statusMessage,
				message: error.message,
				data: error,
			} as H3Response;
		} finally {
			isLoading.value = false;
		}
	}

	return {
		jobs,
		isLoading,
		fetchJobs,
		createJob,
		deleteJob,
	};
});