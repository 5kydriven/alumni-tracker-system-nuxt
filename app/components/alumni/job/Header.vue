<script setup lang="ts">
	const { convertToDate } = useConverter();

	const job = defineProps<{
		type?: Job['type'];
		salary?: Job['salary'];
		desiredWeeklyHours?: Job['desiredWeeklyHours'];
		createdAt?: Job['createdAt'];
	}>();
</script>

<template>
	<div class="w-full md:max-w-80">
		<div
			class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg bg-primary sticky top-4">
			<label class="lg:text-xl font-bold text-white">Job Information</label>
			<div class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
				<div class="flex items-center gap-2">
					<div
						class="bg-yellow-400/90 rounded-lg flex justify-center items-center p-1">
						<UIcon
							name="i-heroicons-briefcase-solid"
							class="w-7 h-7 text-gray-800" />
					</div>
					<div class="flex flex-col justify-center">
						<p class="text-lg font-semibold text-white">Job Type</p>
						<span class="text-sm text-white">
							{{ job.type }}
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="bg-yellow-400/90 rounded-lg flex justify-center items-center p-1">
						<UIcon
							name="i-heroicons-currency-dollar-solid"
							class="w-7 h-7 text-gray-800" />
					</div>
					<div class="flex flex-col justify-center">
						<p class="text-lg font-semibold text-white">Wage/Salary</p>
						<span class="text-sm text-white">
							{{ job.salary }}
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="bg-yellow-400/90 rounded-lg flex justify-center items-center p-1">
						<UIcon
							name="i-heroicons-clock-solid"
							class="w-7 h-7 text-gray-800" />
					</div>
					<div class="flex flex-col justify-center">
						<p class="text-lg font-semibold text-white">Hours per week</p>
						<span class="text-sm text-white">
							{{ job.desiredWeeklyHours }}
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="bg-yellow-400/90 rounded-lg flex justify-center items-center p-1">
						<UIcon
							name="i-heroicons-calendar-solid"
							class="w-7 h-7 text-gray-800" />
					</div>
					<div class="flex flex-col justify-center">
						<p class="text-lg font-semibold text-white">Date Posted</p>
						<span class="text-sm text-white">
							{{ convertToDate(job.createdAt) }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
