<script setup lang="ts">
	const isLoading = ref(false);

	const emits = defineEmits<{
		close: [];
	}>();

	const props = defineProps<{
		uid?: User['uid'];
		name?: User['name'];
	}>();
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				ring: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
			}"
			as="form">
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
				<UFormGroup label="Name">
					<UInput type="text" v-model="props.name" />
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
