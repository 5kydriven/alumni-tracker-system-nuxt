<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const store = useStepperStore();
</script>

<template>
	<div class="flex flex-col gap-2">
		<UFormGroup
			label="What is your current employment status"
			required
			class="col-span-6">
			<USelectMenu
				v-model="(store.form.userCredentials as AlumniCredentials).status"
				:options="['employed', 'unemployed']"
				placeholder="Select status" />
		</UFormGroup>
		<div
			class="grid grid-cols-12 gap-2"
			v-show="(store.form.userCredentials as AlumniCredentials).status == 'employed'">
			<UFormGroup
				label="Job Type"
				class="col-span-6"
				required>
				<USelectMenu
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).jobType"
					placeholder="Select type"
					:options="[
						'full-time',
						'part-time',
						'freelancer',
						'contractual',
						'casual',
						'self-employed',
					]" />
			</UFormGroup>
			<UFormGroup
				label="Company Name"
				class="col-span-6"
				required>
				<UInput
					type="text"
					placeholder="Enter company name"
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).companyName" />
			</UFormGroup>
			<UFormGroup
				label="Company Address"
				class="col-span-6"
				required>
				<UInput
					type="text"
					placeholder="Enter company address"
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).companyAddress" />
			</UFormGroup>
			<UFormGroup
				label="Job Title"
				class="col-span-6"
				required>
				<UInput
					type="text"
					placeholder="(e.g. Administrative Assistant)"
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).jobTitle" />
			</UFormGroup>

			<UFormGroup
				description="from"
				required
				class="col-span-6">
				<VueDatePicker
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).startDate"
					month-picker
					auto-apply
					:teleport="true" />
			</UFormGroup>
			<UFormGroup
				description="to"
				class="col-span-6"
				required>
				<VueDatePicker
					v-model="(store.form.userCredentials?.currentWork as WorkExperience).endDate"
					month-picker
					auto-apply
					:teleport="true" />
			</UFormGroup>
		</div>
	</div>
</template>
