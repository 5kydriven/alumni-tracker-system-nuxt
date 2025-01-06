<script setup lang="ts">

const { convertToDate } = useConverter()

const job = defineProps<{
	type?: Job['type'],
	salary?: Job['salary'],
	desiredWeeklyHours?: Job['desiredWeeklyHours'],
	createdAt?: Job['createdAt'],
}>()
</script>

<template>
	<div class="w-full xl:w-80">
		<div class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-200 dark:border-gray-800 rounded sticky top-4">
			<label class="xl:text-xl">Job Information</label>
			<div class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-briefcase" class="w-6 h-6" />
					<div class="flex flex-col">
						<p class="text-sm xl:text-lg">Job Type</p>
						<span class="text-primary text-xs xl:text-sm capitalize">{{ job.type }}</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-currency-dollar" class="w-6 h-6" />
					<div class="flex flex-col">
						<p class="text-sm xl:text-lg">Wage/Salary</p>
						<span class="text-primary text-xs xl:text-sm">{{ job.salary }}</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-clock" class="w-6 h-6" />
					<div class="flex flex-col">
						<p class="text-sm xl:text-lg">Hours per week</p>
						<span class="text-primary text-xs xl:text-sm">{{ job.desiredWeeklyHours }}</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-calendar" class="w-6 h-6" />
					<div class="flex flex-col">
						<p class="text-sm xl:text-lg">Date Posted</p>
						<span class="text-primary text-xs xl:text-sm">{{ convertToDate(job.createdAt) }}</span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>