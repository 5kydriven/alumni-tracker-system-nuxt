<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const isEmployement = ref(false);
	const isLoading = ref(false);
	const { toastResponse } = useToastComposables();

	const props = defineProps<{
		alumni: User<AlumniCredentials>;
	}>();

	const userCredentials = ref(props.alumni.userCredentials || {});
	const name = ref(props.alumni.name || '');
	const survey = ref<Survey>({
		employmentStatus: 'unknown',
	});

	if (userCredentials.value.status != 'unknown') {
		const { data: response } = useFetch<H3Response>(
			`/api/registrar/alumni/survey/${props.alumni.uid}`,
			{
				method: 'GET',
				immediate: true,
			},
		);
		console.log('open');
		watch(
			response,
			(newResponse) => {
				survey.value = newResponse?.data ?? {};
			},
			{ immediate: true },
		);
	}

	const employmentStatus = [
		{ name: 'Employed', value: 'employed' },
		{ name: 'Self-Employed', value: 'self-employed' },
		{ name: 'Unemployed', value: 'unemployed' },
		{ name: 'Unknown', value: 'unknown' },
	];

	const employmentType = [
		{ name: 'Full-Time', value: 'full-time' },
		{ name: 'Part-Time', value: 'part-time' },
		{ name: 'Contractual', value: 'contractual' },
		{ name: 'Probationary', value: 'probationary' },
	];

	const yearsInJob = [
		'less than 6 months',
		'6 months - 1 year',
		'1 year - 2 years',
		'2 years - 3 years',
		'3 years - 5 years',
		'more than 5 years',
	];

	const items = [
		{
			label: 'Personal',
			icon: 'i-heroicons-user',
		},
		{
			label: 'Employment',
			icon: 'i-heroicons-briefcase',
		},
	];

	function onChanged(index: any) {
		const item = items[index];
		if (item?.label == 'Employment') {
			isEmployement.value = true;
		} else {
			isEmployement.value = false;
		}
	}

	async function onSubmit() {
		isLoading.value = true;
		const res = await $fetch<H3Response>(
			`/api/registrar/alumni/${props.alumni.uid}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					alumni: {
						name: name.value,
						userCredentials: userCredentials.value,
					},
					survey: { ...survey.value, alumniUid: props.alumni.uid },
				}),
			},
		);
		await refreshNuxtData('alumni');
		isLoading.value = false;
		toastResponse(res);
		emits('close');
	}

	const emits = defineEmits<{
		close: [];
	}>();

	watchEffect(() => console.log(survey.value));
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
						v-model="name" />
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
						v-model="survey.employmentStatus"
						:options="employmentStatus"
						placeholder="Select status" />
				</UFormGroup>

				<div
					class="grid grid-cols-12 gap-2"
					v-if="survey.employmentStatus == 'employed'">
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
					v-if="survey.employmentStatus == 'self-employed'">
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
						@click="onSubmit"
						:loading="isLoading" />
				</div>
			</template>
		</UCard>
	</UModal>
</template>
