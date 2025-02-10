<script setup lang="ts">
	const { toastResponse } = useToastComposables();
	const isLoading = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch<H3Response<any>>(
			`/api/alumni/education/${props.educationUid}`,
			{
				method: 'DELETE',
				body: JSON.stringify({ userUid: props.userUid }),
			},
		);
		await refreshNuxtData('alumni-profile');
		isLoading.value = false;
		toastResponse(res);
		emits('close');
	}

	const emits = defineEmits<{
		close: [];
	}>();

	const props = defineProps({
		userUid: { type: String },
		educationUid: { type: String },
	});
</script>

<template>
	<UModal>
		<UCard
			@submit.prevent="onSubmit()"
			as="form"
			:ui="{
				divide: 'divide-y-0',
				header: {
					base: 'flex justify-end items-center',
					padding: 'p-2 sm:p-2',
				},
				body: {
					base: 'flex flex-col justify-center items-center gap-4',
					padding: 'p-0 sm:p-0',
				},
				footer: { base: 'flex justify-center gap-4 items-center' },
			}">
			<template #header>
				<UButton
					icon="i-heroicons-x-mark"
					:padded="false"
					color="gray"
					variant="ghost"
					@click="emits('close')" />
			</template>

			<UIcon
				name="i-heroicons-trash"
				class="w-14 h-14 text-gray-500" />
			<p>Are you sure you want to delete this attainment?</p>

			<template #footer>
				<UButton
					label="No, cancel"
					variant="solid"
					color="white"
					@click="emits('close')" />
				<UButton
					label="Yes, I'm sure"
					color="red"
					type="submit"
					:loading="isLoading" />
			</template>
		</UCard>
	</UModal>
</template>
