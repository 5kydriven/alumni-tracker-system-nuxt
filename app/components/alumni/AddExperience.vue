<script setup lang="ts">
	import type { WorkExperience } from '~~/types/alumni-credentials';
	const experience = reactive<WorkExperience>({});

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
			}"
			as="form">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Work Experience Details
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>

			<div class="flex flex-col gap-4">
				<UFormGroup label="Company Name">
					<UInput
						required
						type="text"
						v-model="experience.companyName"
						placeholder="Enter the company name" />
				</UFormGroup>
				<UFormGroup label="Company Address">
					<UInput
						required
						type="text"
						v-model="experience.companyAddress"
						placeholder="Enter the company address" />
				</UFormGroup>
				<UFormGroup label="Job Title">
					<UInput
						required
						type="text"
						v-model="experience.jobTitle"
						placeholder="Enter your job title" />
				</UFormGroup>
				<div class="flex gap-4 items-center">
					<UFormGroup
						label="From"
						class="w-full">
						<UInput
							required
							type="text"
							v-model="experience.startDate"
							placeholder="Start date (e.g., Jan 2023)" />
					</UFormGroup>
					<UFormGroup
						label="To"
						class="w-full">
						<UInput
							required
							type="text"
							v-model="experience.endDate"
							placeholder="End date or 'Present'" />
					</UFormGroup>
				</div>
			</div>

			<template #footer>
				<div class="flex justify-end gap-2">
					<UButton
						color="gray"
						variant="solid"
						label="Cancel"
						@click="emits('close')" />
					<UButton
						variant="solid"
						label="Save"
						type="submit" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
