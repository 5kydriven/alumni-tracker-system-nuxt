<script setup lang="ts">
	import { UButton } from '#components';

	// const csvData = ref();
	const isLoading = ref(false);

	// CSV Export Function
	async function exportToCSV() {
		const filters = {
			courses: props.selectedCourses,
			statuses: props.selectedStatuses,
			batch: props.selectedBatch,
		};

		// Construct dynamic filename with null/undefined checks
		const filenameParts: string[] = [];
		if (props.selectedCourses?.length)
			filenameParts.push(props.selectedCourses[0]?.toLowerCase() as string);
		if (props.selectedStatuses?.length)
			filenameParts.push(props.selectedStatuses[0]?.toLowerCase() as string);
		if (props.selectedBatch?.length)
			filenameParts.push(props.selectedBatch[0]?.toLowerCase() as string);
		const filename =
			filenameParts.length > 0
				? `${filenameParts.join('-')}.xlsx`
				: 'alumni_export.xlsx';

		const queryParams = new URLSearchParams(
			Object.entries(filters).reduce(
				(acc, [key, value]) => {
					if (Array.isArray(value) && value.length > 0) {
						acc[key] = value.join(',');
					}
					return acc;
				},
				{ filename } as Record<string, string>,
			),
		).toString();

		try {
			const response = await fetch(
				`/api/personnel/alumni/export/excel?${queryParams}`,
				{
					method: 'GET',
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Export failed: ${response.status} - ${errorText}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			link.click();
			window.URL.revokeObjectURL(url);
			emits('close');
		} catch (error) {
			console.error('CSV Export Error:', error);
		}
	}

	async function downloadPDF() {
		const filters = {
			courses: props.selectedCourses,
			statuses: props.selectedStatuses,
			batch: props.selectedBatch,
		};

		const filenameParts: string[] = [];
		if (props.selectedCourses?.length)
			filenameParts.push(props.selectedCourses[0]?.toLowerCase() as string);
		if (props.selectedStatuses?.length)
			filenameParts.push(props.selectedStatuses[0]?.toLowerCase() as string);
		if (props.selectedBatch?.length)
			filenameParts.push(props.selectedBatch[0]?.toLowerCase() as string);
		const filename =
			filenameParts.length > 0
				? `${filenameParts.join('-')}.pdf`
				: 'alumni_export.pdf';

		const queryParams = new URLSearchParams(
			Object.entries(filters).reduce(
				(acc, [key, value]) => {
					if (Array.isArray(value) && value.length > 0) {
						acc[key] = value.join(',');
					}
					return acc;
				},
				{ filename } as Record<string, string>,
			),
		).toString();

		try {
			const response = await fetch(
				`/api/personnel/alumni/export/pdf?${queryParams}`,
				{
					method: 'GET',
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Export failed: ${response.status} - ${errorText}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			link.click();
			window.URL.revokeObjectURL(url);
			emits('close');
		} catch (error) {
			console.error('PDF Export Error:', error);
		}
	}

	const emits = defineEmits<{
		close: [];
	}>();

	const props = defineProps<{
		selectedCourses?: string[];
		selectedBatch?: string[];
		selectedStatuses?: AlumniStatus[];
	}>();
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
			}">
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
			<div class="flex gap-4">
				<UButton
					label="Excel Export"
					@click="exportToCSV"
					:loading="isLoading"
					variant="solid" />
				<UButton
					label="PDF Export"
					:loading="isLoading"
					variant="solid"
					color="red"
					@click="downloadPDF" />
			</div>
			<template #footer>
				<div class="flex justify-end gap-2">
					<UButton
						color="gray"
						variant="solid"
						label="Cancel"
						@click="emits('close')" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
