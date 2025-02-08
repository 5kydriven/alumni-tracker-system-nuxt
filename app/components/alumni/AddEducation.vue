<script setup lang="ts">
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
						Backgroung Education Details
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
						placeholder="Enter the name of your school" />
				</UFormGroup>
				<UFormGroup label="School Address">
					<UInput
						required
						type="text"
						placeholder="Enter the school address" />
				</UFormGroup>
				<div class="flex items-center gap-4">
					<UFormGroup
						label="From"
						class="w-full">
						<UInput
							required
							type="text"
							placeholder="Start year (e.g., 2018)" />
					</UFormGroup>
					<UFormGroup
						label="To"
						class="w-full">
						<UInput
							required
							type="text"
							placeholder="End year (e.g., 2021)" />
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
