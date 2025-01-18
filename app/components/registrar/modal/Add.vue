<script setup lang="ts">
	import Papa from 'papaparse';
	import useComposableToast from '~/composables/useToastComposables';
	import { useRegistrarStore } from '~/stores/registrar';

	const store = useRegistrarStore();
	const { toastResponse } = useComposableToast();

	const csvData = ref();
	const isLoading = ref(false);

	const handleFileChange = (files: FileList) => {
		const file = files.item(0);
		Papa.parse(file, {
			header: true,
			complete: (result: any) => {
				const filteredData = result.data.filter((row: any) =>
					Object.values(row).some((value) => value !== '' && value !== null),
				);
				csvData.value = filteredData;
			},
			error: (error: any) => {
				console.error('Error parsing CSV file:', error);
			},
		});
	};

	async function handleSubmit() {
		isLoading.value = true;
		const res = await $fetch('/api/registrar/alumni', {
			method: 'POST',
			body: JSON.stringify(csvData.value),
		});
		await refreshNuxtData('alumni');
		toastResponse(res);
		isLoading.value = false;
		emits('close');
	}

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
			}"
			as="form"
			@submit.prevent="handleSubmit">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Import Alumni's
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>

			<div>
				<UFormGroup label="Add your csv file">
					<UInput
						type="file"
						size="sm"
						icon="i-heroicons-folder"
						accept=".csv"
						required
						@change="(val) => handleFileChange(val)" />
				</UFormGroup>
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
						label="Upload"
						type="submit"
						:loading="isLoading" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
