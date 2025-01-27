<script setup lang="ts">
	definePageMeta({
		layout: 'user',
	});

	const user = useCurrentUser();
	const nuxtApp = useNuxtApp();

	const { data: jobs, status } = useLazyFetch<Job[]>(
		`/api/employer/job/${user.value.uid}`,
		{
			method: 'GET',
			key: 'employer-jobs',
			getCachedData: (key) => {
				const cachedData =
					nuxtApp.payload.data[key] || nuxtApp.static.data[key];
				if (cachedData) {
					return cachedData;
				}
				return null;
			},
		},
	);
</script>

<template>
	<div class="flex flex-col gap-4 p-4 lg:max-w-screen-xl lg:mx-auto w-full">
		<EmployerHeader />
		<EmployerJobList
			:jobs="jobs"
			v-if="status == 'success'" />
		<div v-else>Loading...</div>
	</div>
</template>
