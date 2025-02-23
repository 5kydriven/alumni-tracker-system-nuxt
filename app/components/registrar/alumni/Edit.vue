<script setup lang="ts">
	const isLoading = ref(false);

	const name = ref('');

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
				divide: 'divide-y divide-gray-300 dark:divide-gray-800',
			}"
			as="form">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Edit Alumni's Informtion
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
					<UInput
						:ui="{
							base: 'capitalize',
						}"
						type="text"
						v-model="props.name" />
				</UFormGroup>
				<UFormGroup label="Phonenumber">
					<UInput
						:maxlength="11"
						v-model="name" />
				</UFormGroup>
				<UFormGroup label="Status">
					<UInput
						type="text"
						v-model="props.name" />
				</UFormGroup>
				<UFormGroup label="City">
					<UInput
						type="text"
						v-model="props.name" />
				</UFormGroup>
				<UFormGroup label="Marital Status">
					<UInput
						type="text"
						v-model="props.name" />
				</UFormGroup>
				<UFormGroup label="Province">
					<UInput
						type="text"
						v-model="props.name" />
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
						label="Save"
						type="submit"
						:loading="isLoading" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
