<script setup lang="ts">
	import { EmployerModalAdd, EmployerModalDelete } from '#components';
	const modal = useModal();

	const props = defineProps<{
		jobs: Job[];
	}>();
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-between">
			<label class="text-xl font-bold">Your Job Posts</label>
			<UButton
				v-show="props.jobs.length >= 1"
				@click="modal.open(EmployerModalAdd, { onClose: modal.close })"
				icon="i-heroicons-plus"
				label="Add job post"
				size="xs"
				:ui="{ rounded: 'rounded-full' }"
			/>
		</div>
		<div
			v-if="props.jobs.length == 0"
			class="h-80 w-full rounded flex flex-col items-center justify-center gap-4 border dark:border-gray-800 border-gray-200"
		>
			<div class="flex flex-col items-center">
				<UIcon
					name="i-heroicons-briefcase"
					class="w-20 h-20 text-gray-500"
				/>
				<label class="text-gray-500 text-lg">
					Your job post will appear here
				</label>
			</div>

			<UButton
				icon="i-heroicons-plus"
				label="Add my first job post"
				@click="modal.open(EmployerModalAdd, { onClose: modal.close })"
			/>
		</div>

		<div
			v-else
			class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
		>
			<div
				v-for="(job, index) in props.jobs"
				class="flex flex-col gap-2 dark:bg-gray-800 bg-white shadow-lg border border-gray-300 rounded-lg p-4 col-span-1"
			>
				<div class="flex items-center justify-between">
					<label
						class="text-lg font-semibold text-blue-500 underline underline-offset-2"
						>{{ job.title }}</label
					>
					<UBadge
						:label="job.type"
						variant="subtle"
						class="capitalize"
					/>
				</div>
				<span class="text-sm">Created on 2024-06-19</span>
				<div class="flex gap-2">
					<UButton
						label="Edit"
						:padded="false"
						variant="link"
						color="gray"
						@click="
							modal.open(EmployerModalAdd, {
								onClose: modal.close,
								job: job,
								index: index,
							})
						"
					/>
					<UDivider
						orientation="vertical"
						:ui="{ border: { base: 'dark:border-gray-500 border-gray-500' } }"
					/>
					<UButton
						label="Delete"
						:padded="false"
						variant="link"
						color="gray"
						@click="
							modal.open(EmployerModalDelete, {
								onClose: modal.close,
								uid: job.uid,
							})
						"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
