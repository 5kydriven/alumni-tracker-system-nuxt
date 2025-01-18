<script setup lang="ts">
	const items = [
		{
			label: 'Message',
			icon: 'i-heroicons-user-solid',
		},
		{
			label: 'Group',
			icon: 'i-heroicons-user-group-solid',
		},
	];

	const isGroup = ref(false);
	const message = ref('');

	function onChanged(index: any) {
		const item = items[index];
		if (item.label == 'Group') {
			isGroup.value = true;
		} else {
			isGroup.value = false;
		}
	}

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal si>
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
						New Chat
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>
			<div class="flex flex-col gap-2 w-full">
				<UTabs
					:items="items"
					@change="onChanged" />

				<div v-if="isGroup">
					<UFormGroup
						label="Group name"
						required>
						<UInput />
					</UFormGroup>
				</div>

				<div
					class="flex flex-col gap-2"
					v-else>
					<UFormGroup
						label="Receiver Name"
						required>
						<UInput />
					</UFormGroup>

					<UTextarea
						v-model="message"
						placeholder="Write your message..." />
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
						label="Create"
						type="submit" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
