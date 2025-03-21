<script setup lang="ts">
	import useComposableToast from '~/composables/useToastComposables';

	const { toastResponse } = useComposableToast();
	const isLoading = ref(false);

	const props = defineProps<{
		userData: User<any>;
	}>();

	const user = ref(props.userData);
	const userCredentials = ref(props.userData.userCredentials || {});

	const handleSubmit = async (user: User) => {
		isLoading.value = true;
		const res = await $fetch<H3Response>(
			`/api/admin/user/${props.userData.uid}`,
			{
				method: 'PUT',
				body: JSON.stringify(user),
			},
		);
		// await refreshNuxtData('users');
		toastResponse(res);
		isLoading.value = false;
		emits('close');
	};

	const emits = defineEmits<{
		close: [];
	}>();

	watchEffect(() => console.log(props.userData));
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
							Edit User
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="emits('close')" />
					</div>
				</template>

				<div
					class="grid grid-cols-1 md:grid-cols-2 gap-2"
					v-if="props.userData.role == 'registrar'">
					<UFormGroup
						label="Name"
						class="col-span-2">
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
					<UFormGroup label="Role">
						<USelectMenu
							required
							v-model="user.role"
							:options="['registrar', 'employer']"
							placeholder="Select role" />
					</UFormGroup>
				</div>

				<div
					class="grid grid-cols-1 md:grid-cols-2 gap-2"
					v-if="props.userData.role == 'employer'">
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
					<UFormGroup label="Role">
						<USelectMenu
							required
							v-model="user.role"
							:options="['registrar', 'employer']"
							placeholder="Select role" />
					</UFormGroup>
					<UFormGroup label="Company Name">
						<UInput
							v-model="userCredentials.companyName"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Company Address">
						<UInput
							v-model="userCredentials.companyAddress"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Contact Number">
						<UInput
							v-model="userCredentials.contactNumber"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Field">
						<UInput
							v-model="userCredentials.field"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Number Branches">
						<UInput
							v-model="userCredentials.numberBranches"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Number Employees">
						<UInput
							v-model="userCredentials.numberEmployees"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Position">
						<UInput
							v-model="userCredentials.position"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Telephone Number">
						<UInput
							v-model="userCredentials.telephoneNumber"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup label="Website">
						<UInput
							v-model="userCredentials.website"
							type="text"
							size="sm" />
					</UFormGroup>
					<UFormGroup
						label="Website"
						class="col-span-2">
						<UTextarea
							v-model="userCredentials.description"
							type="text"
							size="sm" />
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
							label="Update"
							:loading="isLoading" />
					</div>
				</template>
			</UCard>
		</form>
	</UModal>
</template>
