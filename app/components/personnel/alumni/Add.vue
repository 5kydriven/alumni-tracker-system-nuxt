<script setup lang="ts">
	import Papa from 'papaparse';
	import useComposableToast from '~/composables/useToastComposables';

	const { toastResponse } = useComposableToast();

	const csvData = ref();
	const isLoading = ref(false);

	const handleFileChange = (files: FileList) => {
		const file = files.item(0);
		csvData.value = file;
		// Papa.parse(file as File, {
		// 	header: true,
		// 	encoding: 'UTF-8',
		// 	complete: (result: any) => {
		// 		const filteredData = result.data.filter((row: any) =>
		// 			Object.values(row).some((value) => value !== '' && value !== null),
		// 		);
		// 		csvData.value = filteredData;
		// 	},
		// 	error: (error: any) => {
		// 		console.error('Error parsing CSV file:', error);
		// 	},
		// });
	};

	async function handleSubmit() {
		isLoading.value = true;
		const formData = new FormData();
		formData.append('file', csvData.value);
		const res = await $fetch<H3Response<any>>('/api/personnel/alumni', {
			method: 'POST',
			body: formData,
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

			<UFormGroup
				label="Add your csv file"
				description="Please make the header small letters">
				<UInput
					type="file"
					name="file"
					size="sm"
					icon="i-heroicons-folder"
					accept=".csv"
					@change="((val: FileList) => handleFileChange(val))"
					required />
			</UFormGroup>

			<template #footer>
				<div class="flex justify-end gap-2">
					<UButton
						color="gray"
						variant="solid"
						label="Cancel"
						@click="emits('close')" />
					<UButton
						:disabled="!csvData"
						variant="solid"
						label="Upload"
						type="submit"
						:loading="isLoading" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
