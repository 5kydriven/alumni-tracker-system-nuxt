<script setup lang="ts">
	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const route = useRoute();

	const {
		data: job,
		status,
		error,
	} = await useLazyFetch<Job>(`/api/job/${route.params.jobUid}`, {
		method: 'GET',
	});

	if (error.value) {
		showError({
			statusCode: 404,
			statusMessage: 'Page not found',
		});
	}
</script>

<template>
	<div class="flex gap-4 flex-col xl:flex-row p-4 max-w-screen-xl mx-auto">
		<template v-if="status == 'success' && job?.createdAt">
			<AlumniJobHeader v-bind="job" />
			<AlumniJobDescription v-bind="job" />
		</template>

		<template v-else>
			<div class="w-full xl:w-80">
				<div
					class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-300 shadow-lg dark:border-gray-800 rounded sticky top-4 bg-white">
					<USkeleton class="w-[110px] h-[24px]" />
					<div
						class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
						<div
							class="flex items-center gap-2"
							v-for="index in 4"
							:key="index">
							<USkeleton class="w-[36px] h-[36px]" />
							<div class="flex flex-col gap-2">
								<USkeleton class="w-[75px] h-[36px]" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex-1 flex flex-col bg-white border-gray-300 border rounded-lg p-4 shadow-lg">
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<USkeleton class="w-[48px] h-[48px]" />
						<div class="flex flex-col">
							<USkeleton class="w-[150px] h-[48px]" />
						</div>
					</div>
					<div>
						<USkeleton class="w-[55px] h-[32px]" />
					</div>
				</div>
				<UDivider class="mt-2 mb-4" />
				<div class="flex flex-col">
					<USkeleton class="h-[250px]" />
				</div>
			</div>
		</template>
	</div>
</template>
