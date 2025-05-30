<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const { toastResponse } = useToastComposables();

	const seminar = reactive<Seminar>({});
	const isLoading = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch(`/api/alumni/seminar/${props.uid}`, {
			method: 'POST',
			body: JSON.stringify(seminar),
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
						Seminar/Training Details
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
				<UFormGroup label="Seminar/Training Name">
					<UInput
						required
						type="text"
						v-model="seminar.name"
						placeholder="Enter the seminar/training name" />
				</UFormGroup>
				<div class="flex gap-4 items-center">
					<UFormGroup
						label="Date"
						class="w-full">
						<VueDatePicker
							v-model="seminar.date"
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
