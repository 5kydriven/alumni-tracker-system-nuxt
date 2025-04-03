<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';

	const { toastResponse } = useToastComposables();

	const props = defineProps<{
		userData: User<any>;
	}>();

	// const employmentStatus = [
	// 	{ name: 'Employed', value: 'employed' },
	// 	{ name: 'Self-Employed', value: 'self-employed' },
	// 	{ name: 'Unemployed', value: 'unemployed' },
	// 	{ name: 'Unknown', value: 'unknown' },
	// ];

	// const employmentType = [
	// 	{ name: 'Full-Time', value: 'full-time' },
	// 	{ name: 'Part-Time', value: 'part-time' },
	// 	{ name: 'Contractual', value: 'contractual' },
	// 	{ name: 'Probationary', value: 'probationary' },
	// ];

	// const yearsInJob = [
	// 	'less than 6 months',
	// 	'6 months - 1 year',
	// 	'1 year - 2 years',
	// 	'2 years - 3 years',
	// 	'3 years - 5 years',
	// 	'more than 5 years',
	// ];

	// const items = [
	// 	{
	// 		label: 'Personal',
	// 		icon: 'i-heroicons-user',
	// 	},
	// 	{
	// 		label: 'Employment',
	// 		icon: 'i-heroicons-briefcase',
	// 	},
	// ];

	const user = ref(props.userData);
	const userCredentials = ref(props.userData.userCredentials || {});
	// const survey = ref<Survey>({});
	const isLoading = ref(false);
	// const isEmployement = ref(false);

	async function handleSubmit(user: User) {
		isLoading.value = true;
		const res = await $fetch<H3Response>(
			`/api/admin/user/${props.userData.uid}`,
			{
				method: 'PUT',
				body: JSON.stringify({ ...user }),
			},
		);
		await refreshNuxtData('users');
		toastResponse(res);
		isLoading.value = false;
		emits('close');
	}

	// function onChanged(index: any) {
	// 	const item = items[index];
	// 	if (item?.label == 'Employment') {
	// 		isEmployement.value = true;
	// 	} else {
	// 		isEmployement.value = false;
	// 	}
	// }

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
					v-if="props.userData.role == 'personnel'">
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
							:options="['personnel', 'employer']"
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
							:options="['personnel', 'employer']"
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

				<!-- <div v-if="props.userData.role == 'alumni'">
					<UTabs
						:items="items"
						@change="onChanged" />

					<div
						v-if="!isEmployement"
						class="grid grid-cols-1 md:grid-cols-2 gap-2">
						<UFormGroup label="Name">
							<UInput
								:ui="{
									base: 'capitalize',
								}"
								type="text"
								v-model="user.name" />
						</UFormGroup>
						<UFormGroup label="Phonenumber">
							<UInput
								:maxlength="11"
								v-model="userCredentials.phoneNumber" />
						</UFormGroup>
						<UFormGroup
							label="City"
							class="col-span-1">
							<UInput
								type="text"
								v-model="userCredentials.city" />
						</UFormGroup>
						<UFormGroup
							label="Province"
							class="col-span-1">
							<UInput
								type="text"
								v-model="userCredentials.province" />
						</UFormGroup>
						<UFormGroup label="Marital Status">
							<UInput
								type="text"
								v-model="userCredentials.maritalStatus" />
						</UFormGroup>
						<UFormGroup label="Birthdate">
							<VueDatePicker
								:enable-time-picker="false"
								auto-apply
								v-model="userCredentials.birthDate" />
						</UFormGroup>
						<UFormGroup label="Birth place">
							<UInput
								type="text"
								v-model="userCredentials.birthPlace" />
						</UFormGroup>
					</div>

					<div
						class="flex flex-col gap-2"
						v-else>
						<UFormGroup
							label="Employment status"
							required
							class="col-span-6">
							<USelectMenu
								value-attribute="value"
								option-attribute="name"
								v-model="userCredentials.status"
								:options="employmentStatus"
								placeholder="Select status" />
						</UFormGroup>

						<div
							class="grid grid-cols-12 gap-2"
							v-if="userCredentials.status == 'employed'">
							<UFormGroup
								label="Company Name"
								class="col-span-6"
								required>
								<UInput
									type="text"
									required
									placeholder="Enter company name"
									v-model="survey.companyName" />
							</UFormGroup>
							<UFormGroup
								label="Company Address"
								class="col-span-6"
								required>
								<UInput
									type="text"
									required
									placeholder="Enter company address"
									v-model="survey.companyAddress" />
							</UFormGroup>
							<UFormGroup
								label="Employment Type"
								class="col-span-6"
								required>
								<USelectMenu
									placeholder="Select type of employemet"
									required
									:options="employmentType"
									valueAttribute="value"
									optionAttribute="name"
									v-model="survey.employmentType" />
							</UFormGroup>
							<UFormGroup
								label="Years in current job"
								class="col-span-6"
								required>
								<USelectMenu
									placeholder="Select years"
									required
									:options="yearsInJob"
									v-model="survey.yearsInJob" />
							</UFormGroup>
						</div>

						<div
							class="grid grid-cols-12 gap-2"
							v-if="userCredentials.status == 'self-employed'">
							<UFormGroup
								label="Bussiness Name"
								class="col-span-6"
								required>
								<UInput
									type="text"
									required
									placeholder="Enter business name"
									v-model="survey.bussinessName" />
							</UFormGroup>
							<UFormGroup
								label="Nature of Bussiness"
								class="col-span-6"
								required>
								<UInput
									type="text"
									required
									placeholder="Enter nature of bussiness"
									v-model="survey.workNature" />
							</UFormGroup>
							<UFormGroup
								label="Is your Business registered?"
								class="col-span-6"
								required>
								<USelectMenu
									optionAttribute="name"
									placeholder="Select the following options"
									required
									valueAttribute="value"
									:options="[
										{ name: 'Yes', value: 'yes' },
										{ name: 'No', value: 'no' },
									]"
									v-model="survey.isRegistered" />
							</UFormGroup>
							<UFormGroup
								label="Years in business"
								class="col-span-6"
								required>
								<USelectMenu
									placeholder="Select years"
									required
									:options="yearsInJob"
									v-model="survey.yearsInJob" />
							</UFormGroup>
							<UFormGroup
								label="Business Website / Social Media"
								class="col-span-6">
								<UInput
									type="text"
									placeholder="Enter url of your website or social media"
									v-model="survey.urlLink" />
							</UFormGroup>
						</div>
					</div>
				</div> -->

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
