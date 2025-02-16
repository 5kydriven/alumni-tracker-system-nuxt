<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const { toastResponse } = useToastComposables();
	const currentDate = new Date();

	const experience = reactive<WorkExperience>({
		endDate: {
			month: currentDate.getMonth(),
			year: currentDate.getFullYear(),
		},
	});
	const isLoading = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch(`/api/alumni/experience/${props.uid}`, {
			method: 'POST',
			body: JSON.stringify(experience),
		});
		await refreshNuxtData('alumni-profile');
		toastResponse(res);
		emits('close');
		isLoading.value = false;
	}

	const emits = defineEmits<{
		close: [];
	}>();

	const props = defineProps({
		uid: {
			type: String,
		},
	});
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
			}"
			as="form"
			@submit.prevent="onSubmit">
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
						<VueDatePicker
							v-model="experience.startDate"
							month-picker
							auto-apply
							required
							:teleport="true" />
					</UFormGroup>
					<UFormGroup
						label="To"
						class="w-full">
						<VueDatePicker
							v-model="experience.endDate"
							month-picker
							auto-apply
							required
							:teleport="true" />
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
						type="submit"
						:loading="isLoading" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
