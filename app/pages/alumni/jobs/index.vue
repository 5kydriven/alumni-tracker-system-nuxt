<script setup lang="ts">
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const { convertTimestamp } = useConverter();

	const categories = ref([
		{ name: 'Full Time', key: 'A' },
		{ name: 'Part Time', key: 'M' },
		{ name: 'Freelancing', key: 'P' },
		{ name: 'Fixed Price', key: 'R' },
		{ name: 'Remote', key: 'R' },
		{ name: 'Hourly Basis', key: 'R' },
		{ name: 'Hybrid', key: 'R' },
	]);

	const { data: jobs, status } = await useLazyFetch<Job[]>('/api/job');
</script>

<template>
	<div
		class="flex gap-4 p-4 flex-col md:flex-row max-w-screen-xl justify-center w-full mx-auto">
		<div class="w-full md:w-80">
			<div
				class="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg sticky top-4 bg-white">
				<UInput
					placeholder="Search..."
					type="text"
					icon="i-heroicons-magnifying-glass" />
				<div class="flex flex-col gap-1.5">
					<label class="text-lg font-bold">Job Types</label>
					<div class="flex flex-col gap-1">
						<UCheckbox v-for="category of categories">
							<template #label>
								<span class="dark:text-gray-500">{{ category.name }}</span>
							</template>
						</UCheckbox>
					</div>
				</div>
			</div>
		</div>

		<template v-if="status === 'success'">
			<div class="flex-1 flex flex-col gap-4">
				<div
					v-for="(job, index) in jobs"
					:key="index"
					class="w-full border dark:border-gray-800 p-4 border-gray-200 rounded-lg break-words flex flex-col gap-4 bg-white shadow-lg">
					<div class="flex justify-between">
						<div class="flex flex-col gap-2">
							<div class="flex gap-2 items-center">
								<label class="font-bold text-xl">
									{{ job.title }}
								</label>
								<span class="text-sm dark:text-gray-500 text-gray-400">
									{{ convertTimestamp(job.createdAt) }}
								</span>
							</div>
							<div class="flex gap-2">
								<UBadge
									size="sm"
									:label="job.type"
									variant="soft"
									class="capitalize" />
								<!-- <UBadge size="sm" label="Hybrid" variant="soft" /> -->
								<span class="dark:text-gray-500 text-gray-900"
									>{{ job.salary }}/month</span
								>
							</div>
						</div>
						<div>
							<UButton
								icon="i-heroicons-bookmark"
								variant="soft" />
						</div>
					</div>
					<div class="flex flex-col">
						<p
							class="text-gray-500 text-sm truncate text-wrap h-36"
							v-html="job.description?.replace(/\n/g, '<br>')"></p>
						<UButton
							label="View more"
							:to="`/alumni/jobs/${job.uid}`"
							class="self-end" />
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="flex-1 flex flex-col gap-4">
				<div
					v-for="index in 4"
					:key="index"
					class="w-full border dark:border-gray-800 p-4 border-gray-200 rounded-lg break-words flex flex-col gap-4 bg-white shadow-lg">
					<div class="flex justify-between">
						<div class="flex flex-col gap-2">
							<USkeleton class="w-[250px] h-[28px]" />
							<div class="flex gap-2">
								<USkeleton class="w-[65px] h-[24px]" />
								<USkeleton class="w-[80px] h-[24px]" />
							</div>
						</div>
						<div>
							<USkeleton class="w-[32px] h-[32px]" />
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<USkeleton class="h-[140px]" />
						<USkeleton class="h-[32px] w-[87px] self-end" />
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
