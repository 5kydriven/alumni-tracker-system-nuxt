<script setup lang="ts">
	const props = defineProps<{
		title?: Job['title'];
		contactPerson?: Job['contactPerson'];
		email?: Job['email'];
		description?: Job['description'];
		employerUid?: Job['employerUid'];
		uid?: Job['uid'];
		alumniCredentials: AlumniCredentials;
	}>();

	const isApplicable = computed(() => {
		return props.alumniCredentials?.description !== '';
	});
</script>

<template>
	<div class="flex flex-col gap-4">
		<div
			v-if="!isApplicable"
			class="border-red-300 border-2 bg-red-500/20 p-2 text-center text-red-500 rounded-lg">
			<span>Complete all your information to apply a job</span>
		</div>
		<div
			class="flex-1 flex flex-col bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2">
					<UAvatar
						:alt="props.title"
						:ui="{ rounded: 'rounded' }"
						size="lg" />
					<div class="flex flex-col">
						<label class="capitalize text-lg font-bold">{{
							props.title
						}}</label>
						<span class="text-sm text-gray-500"
							>{{ props.contactPerson }} ({{ props.email }})</span
						>
					</div>
				</div>
				<div>
					<UButton
						label="Apply"
						:disabled="!isApplicable"
						@click="() => console.log(props.employerUid)" />
				</div>
			</div>
			<UDivider class="mt-2 mb-4" />
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<p v-html="props.description?.replace(/\n/g, '<br>')"></p>
				</div>
				<div class="flex justify-end">
					<!-- <UButton>
								Apply Now
							</UButton> -->
				</div>
			</div>
		</div>
	</div>
</template>
