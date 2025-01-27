<script setup lang="ts">
	const job = defineProps<{
		title?: Job['title'];
		contactPerson?: Job['contactPerson'];
		email?: Job['email'];
		description?: Job['description'];
		employerUid?: Job['employerUid'];
	}>();
</script>

<template>
	<div
		class="flex-1 flex flex-col bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-2">
				<UAvatar
					:alt="job.title"
					:ui="{ rounded: 'rounded' }"
					size="lg" />
				<div class="flex flex-col">
					<label class="capitalize text-lg font-bold">{{ job.title }}</label>
					<span class="text-sm text-gray-500"
						>{{ job.contactPerson }} ({{ job.email }})</span
					>
				</div>
			</div>
			<div>
				<UButton
					label="Apply"
					@click="() => console.log(job.employerUid)" />
			</div>
		</div>
		<UDivider class="mt-2 mb-4" />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<p v-html="job.description.replace(/\n/g, '<br>')"></p>
			</div>
			<div class="flex justify-end">
				<!-- <UButton>
              Apply Now
            </UButton> -->
			</div>
		</div>
	</div>
</template>
