<script setup lang="ts">
	definePageMeta({
		middleware: ['employer'],
		layout: 'user',
	});

	const user = useCurrentUser();
	const nuxtApp = useNuxtApp();

	const { data: jobs, status } = useLazyFetch<Job[]>(
		`/api/employer/job/${user.value?.uid}`,
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
		<div class="border rounded-lg shadow-lg bg-white p-4 flex gap-4">
			<UAvatar
				alt="John Doe"
				:ui="{
					rounded: 'rounded-lg',
				}"
				size="xl" />
			<div class="flex flex-col gap-2">
				<div class="flex flex-col">
					<label class="text-xl font-bold">John Doe</label>
					<div class="flex gap-2 items-center">
						<UIcon name="i-heroicons-building-office" />
						<p class="text-sm">Company Name</p>
					</div>
					<div class="flex gap-2 items-center">
						<UIcon name="i-heroicons-map-pin" />
						<p class="text-sm">Address</p>
					</div>
					<div class="flex gap-2 items-center">
						<UIcon name="i-heroicons-phone" />
						<p class="text-sm">09385254044</p>
					</div>
					<div class="flex gap-2 items-center">
						<UIcon name="i-heroicons-envelope" />
						<p class="text-sm">example@gmail.com</p>
					</div>
				</div>
				<div class="text-sm flex flex-col">
					<label class="text-lg font-bold">About</label>
					<p>asdfj adjf ajadsfj jadfjas jadfj adfj</p>
				</div>
			</div>
		</div>
		<EmployerJobList
			:jobs="jobs"
			v-if="status == 'success'" />
		<div v-else>Loading...</div>
	</div>
</template>
