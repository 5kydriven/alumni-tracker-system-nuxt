<script setup lang="ts">
	import useComposableToast from '~/composables/useToastComposables';

	const { toastResponse } = useComposableToast();
	const isLoading = ref(false);
	const user = reactive<User>({
		name: '',
		email: '',
		password: '',
		role: undefined,
	});

	const handleSubmit = async (user: User) => {
		isLoading.value = true;
		const res = await $fetch('/api/admin/user', {
			method: 'POST',
			body: JSON.stringify(user),
		});
		await refreshNuxtData('users');
		toastResponse(res);
		isLoading.value = false;
		emits('close');
	};

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal>
		<form @submit.prevent="handleSubmit(user)">
			<UCard
				:ui="{
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}">
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							Create User
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="emits('close')" />
					</div>
				</template>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
					<UFormGroup label="Name">
						<UInput
							required
							v-model="user.name"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Email">
						<UInput
							required
							v-model="user.email"
							type="email"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Password">
						<UInput
							required
							v-model="user.password"
							type="password"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Role">
						<USelectMenu
							required
							v-model="user.role"
							:options="['registrar', 'employer']"
							placeholder="Select role" />
					</UFormGroup>
				</div>

				<template #footer>
					<div class="flex justify-end gap-2">
						<UButton
							color="gray"
							@click="emits('close')"
							variant="solid"
							label="Cancel" />
						<UButton
							variant="solid"
							type="submit"
							label="Create"
							:loading="isLoading" />
					</div>
				</template>
			</UCard>
		</form>
	</UModal>
</template>
