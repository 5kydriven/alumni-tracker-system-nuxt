<script setup lang="ts">
	const { toastResponse } = useToastComposables();
	const isLoading = ref(false);
	const message = ref<string>();

	const emits = defineEmits<{
		close: [];
	}>();

	const props = defineProps<{
		uid?: string;
		displayName?: string;
		email?: string;
	}>();

	async function onDelete(uid: string) {
		isLoading.value = true;
		const res = await $fetch<H3Response<any>>(`/api/admin/user/queue/${uid}`, {
			method: 'DELETE',
			body: JSON.stringify({
				email: props.email,
				displayName: props.displayName,
				message: message.value,
			}),
		});
		await refreshNuxtData('employer-queue');
		isLoading.value = false;
		toastResponse(res);
		emits('close');
	}
</script>

<template>
	<UModal>
		<UCard
			:ui="{
				divide: 'divide-y-0',
				body: {
					base: 'flex flex-col justify-center items-center gap-4',
					padding: 'py-0 sm:py-0',
				},
				footer: { base: 'flex justify-end gap-4 items-center' },
			}">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Rejection reason
					</h3>
					<UButton
						icon="i-heroicons-x-mark"
						color="gray"
						variant="ghost"
						@click="emits('close')" />
				</div>
			</template>

			<UFormGroup
				class="w-full"
				label="Enter a rejection reason for the employer">
				<UTextarea v-model="message" />
			</UFormGroup>

			<template #footer>
				<UButton
					label="Cancel"
					variant="solid"
					color="gray"
					@click="emits('close')" />
				<UButton
					label="Submit"
					color="red"
					@click="onDelete(props.uid as string)"
					:loading="isLoading" />
			</template>
		</UCard>
	</UModal>
</template>
