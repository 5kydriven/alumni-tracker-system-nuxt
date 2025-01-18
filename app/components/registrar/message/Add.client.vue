<script setup lang="ts">
	const nuxtApp = useNuxtApp();
	const user = useCurrentUser();
	const { toastResponse } = useToastComposables();

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

	const batch = ['2025', '2026'];

	const conversation = reactive({
		isGroup: false,
		message: '',
		user: null,
		currentUid: user.value.uid,
		batch: null,
	});

	const limit = ref(5);
	const q = ref();
	const isLoading = ref(false);

	const query = computed(() => ({ q: q.value, limit: limit.value }));

	const { data: alumni, status } = useFetch<PaginatedResponse<Alumni[]>>(
		'/api/registrar/alumni',
		{
			method: 'GET',
			query,
			getCachedData: (key) => {
				const cachedData =
					nuxtApp.payload.data[key] || nuxtApp.static.data[key];
				if (cachedData) {
					return cachedData;
				}
				return null;
			},
			watch: [q],
		},
	);

	function onChanged(index: any) {
		const item = items[index];
		if (item.label == 'Group') {
			conversation.isGroup = true;
		} else {
			conversation.isGroup = false;
		}
	}

	async function onSubmitted() {
		isLoading.value = true;
		const res = await $fetch<H3Response>('/api/registrar/message', {
			method: 'POST',
			body: JSON.stringify(conversation),
		});
		isLoading.value = false;
		toastResponse(res);
		emits('close');
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
			as="form"
			@submit.prevent="onSubmitted">
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

				<div
					v-if="conversation.isGroup"
					class="flex flex-col gap-2">
					<UFormGroup
						label="Group name"
						required
						v-model="conversation.user">
						<UInput v-model="conversation.user" />
					</UFormGroup>
					<UFormGroup
						label="Select Batch"
						required>
						<USelectMenu
							:options="batch"
							v-model="conversation.batch" />
					</UFormGroup>
				</div>

				<div
					class="flex flex-col gap-2"
					v-else>
					<UFormGroup
						label="Receiver Name"
						required>
						<UInputMenu
							option-attribute="name"
							placeholder="search name..."
							v-model="conversation.user"
							v-model:query="q"
							:loading="status != 'success'"
							:options="alumni && alumni.data">
							<template #option="{ option }">
								<span>{{ option.name }}</span>
							</template>
						</UInputMenu>
					</UFormGroup>

					<UTextarea
						v-model="conversation.message"
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
						:loading="isLoading"
						variant="solid"
						label="Create"
						type="submit" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
