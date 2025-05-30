<script setup lang="ts">
	import { AlumniPrivacyModal } from '#components';

	const store = useStepperStore();
	const modal = useModal();

	const employmentStatus = [
		{ name: 'Yes, I have been employed', value: 'employed' },
		{ name: 'No, I was never employed. ', value: 'unemployed' },
	];

	const employmentType = [
		{ name: 'Formally Employed', value: 'employed' },
		{ name: 'Self Employed', value: 'self-employed' },
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
			label=" Have you ever been employed anytime after graduation?"
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
				label="Type of employment"
				required
				class="col-span-12">
				<USelectMenu
					value-attribute="value"
					option-attribute="name"
					v-model="store.survey.employmentType"
					:options="employmentType"
					placeholder="Select status" />
			</UFormGroup>
		</div>

		<div
			class="grid grid-cols-12 gap-2"
			v-if="
				store.survey.employmentType == 'employed' &&
				store.survey.employmentStatus == 'employed'
			">
			<UFormGroup
				label="Company Name (latest employer if employed several times) "
				class="col-span-12"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter company name"
					v-model="store.survey.companyName" />
			</UFormGroup>
			<UFormGroup
				label="Please upload any form of proof such as I.D. if available. Thank you"
				class="col-span-12"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter company address"
					v-model="store.survey.companyAddress" />
			</UFormGroup>
		</div>

		<div
			class="grid grid-cols-12 gap-2"
			v-if="
				store.survey.employmentType == 'self-employed' &&
				store.survey.employmentStatus == 'employed'
			">
			<UFormGroup
				label="Type of Bussiness"
				class="col-span-12"
				required>
				<UInput
					type="text"
					required
					placeholder="Enter nature of bussiness"
					v-model="store.survey.workNature" />
			</UFormGroup>
			<UFormGroup
				label="Please upload any form of proof such as business permit if available. If none, it's alright."
				class="col-span-12">
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
