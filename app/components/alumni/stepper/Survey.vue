<script setup lang="ts">
	import { AlumniPrivacyModal } from '#components';

	const store = useStepperStore();
	const modal = useModal();

	const employmentStatus = [
		{ name: 'Employed', value: 'employed' },
		{ name: 'Self-Employed', value: 'self-employed' },
		{ name: 'Unemployed', value: 'unemployed' },
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
</script>

<template>
	<div class="flex flex-col gap-2">
		<UFormGroup
			label="What is your current employment status"
			required
			class="col-span-6">
			<USelectMenu
				value-attribute="value"
				option-attribute="name"
				v-model="store.survey.employmentStatus"
				:options="employmentStatus"
				placeholder="Select status" />
		</UFormGroup>

		<div
			class="grid grid-cols-12 gap-2"
			v-if="store.survey.employmentStatus == 'employed'">
			<UFormGroup
				label="Company Name"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter company name"
					v-model="store.survey.companyName" />
			</UFormGroup>
			<UFormGroup
				label="Company Address"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter company address"
					v-model="store.survey.companyAddress" />
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
					v-model="store.survey.employmentType" />
			</UFormGroup>
			<UFormGroup
				label="Years in current job"
				class="col-span-6"
				required>
				<USelectMenu
					placeholder="Select years"
					required
					:options="yearsInJob"
					v-model="store.survey.yearsInJob" />
			</UFormGroup>
		</div>

		<div
			class="grid grid-cols-12 gap-2"
			v-if="store.survey.employmentStatus == 'freelancer'">
			<UFormGroup
				label="Job Title/Profession"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="e.g., Freelance Graphic Designer"
					v-model="store.survey.jobTitle" />
			</UFormGroup>
			<UFormGroup
				label="Nature of Work / Services Offered"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="e.g., Logo Design, Web Development"
					v-model="store.survey.workNature" />
			</UFormGroup>
			<UFormGroup
				label="Portfolio / Website "
				class="col-span-6">
				<UInput
					type="text"
					placeholder="Enter website url or social media"
					v-model="store.survey.urlLink" />
			</UFormGroup>
		</div>

		<div
			class="grid grid-cols-12 gap-2"
			v-if="store.survey.employmentStatus == 'self-employed'">
			<UFormGroup
				label="Bussiness Name"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter business name"
					v-model="store.survey.bussinessName" />
			</UFormGroup>
			<UFormGroup
				label="Nature of Bussiness"
				class="col-span-6"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter nature of bussiness"
					v-model="store.survey.workNature" />
			</UFormGroup>
			<UFormGroup
				label="Is your Business registered?"
				class="col-span-6"
				required>
				<USelectMenu
					placeholder="Select the following options"
					optionAttribute="name"
					required
					valueAttribute="value"
					:options="[
						{ name: 'Yes', value: 'yes' },
						{ name: 'No', value: 'no' },
					]"
					v-model="store.survey.isRegistered" />
			</UFormGroup>
			<UFormGroup
				label="Years in business"
				class="col-span-6"
				required>
				<USelectMenu
					placeholder="Select years"
					required
					:options="yearsInJob"
					v-model="store.survey.yearsInJob" />
			</UFormGroup>
			<UFormGroup
				label="Business Website / Social Media"
				class="col-span-6">
				<UInput
					type="text"
					placeholder="Enter url of your website or social media"
					v-model="store.survey.urlLink" />
			</UFormGroup>
		</div>

		<div>
			<UCheckbox
				v-model="store.form.isAgree"
				:ui="{
					wrapper: 'items-center',
				}">
				<template #label>
					<p class="flex items-center gap-1">
						I agree to the
						<UButton
							@click="
								modal.open(AlumniPrivacyModal, {
									onClose: modal.close,
								})
							"
							class="px-0"
							color="blue"
							label="Privacy Policy"
							variant="link" />
					</p>
				</template>
			</UCheckbox>
		</div>
	</div>
</template>
