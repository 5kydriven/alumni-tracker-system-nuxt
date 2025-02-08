<script setup lang="ts">
	const user = useCurrentUser();
	const { toastResponse } = useToastComposables();
	const description = ref<string>();
	const isLoading = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch<H3Response>(
			`/api/alumni/description/${user.value?.uid}`,
			{
				method: 'POST',
				body: JSON.stringify(description.value),
			},
		);
		await refreshNuxtData('alumni-profile');
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
			}"
			as="form"
			@submit.prevent="onSubmit">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Add Description
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>

			<UFormGroup label="Description">
				<UTextarea
					required
					size="lg"
					v-model="description"
					placeholder="Summarize your goals and what makes you a great candidate."
					color="gray" />
			</UFormGroup>

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
