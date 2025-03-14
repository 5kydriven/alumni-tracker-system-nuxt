<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const background = reactive<EducationalBackground>({});
	const isLoading = ref(false);
	const { toastResponse } = useToastComposables();

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch(`/api/alumni/education/${props.uid}`, {
			method: 'POST',
			body: JSON.stringify(background),
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
						Background Education Details
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
				<UFormGroup label="School Name">
					<UInput
						required
						type="text"
						v-model="background.schoolName"
						placeholder="Enter the name of your school" />
				</UFormGroup>
				<UFormGroup label="School Address">
					<UInput
						required
						type="text"
						v-model="background.schoolAddress"
						placeholder="Enter the school address" />
				</UFormGroup>
				<div class="flex items-center gap-4">
					<UFormGroup
						label="From"
						class="w-full">
						<VueDatePicker
							year-picker
							v-model="background.startDate"
							auto-apply
							required
							:teleport="true"></VueDatePicker>
					</UFormGroup>
					<UFormGroup
						label="To"
						class="w-full">
						<VueDatePicker
							year-picker
							v-model="background.endDate"
							auto-apply
							required
							:teleport="true"></VueDatePicker>
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
