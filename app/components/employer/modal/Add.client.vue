<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types';

	const schema = z.object({
		title: z.string().nonempty('Job title is required'),
		type: z.string().nonempty('Employement type is required'),
		email: z.string().nonempty('Email is required').email('Invalid email'),
		contactPerson: z.string().nonempty('Contact person is required'),
		salary: z.string().nonempty('Salary is required'),
		desiredWeeklyHours: z.string().nonempty('Desired weekly hours is required'),
		description: z
			.string()
			.nonempty('Description is required')
			.min(50, 'Description must be at least 50 characters'),
		companyName: z.string().nonempty('Company name is required'),
	});

	type Schema = z.output<typeof schema>;

	const user = useCurrentUser();
	const { toastResponse } = useToastComposables();

	const isLoading = ref(false);
	const form = reactive<Job>({
		companyName: '',
		title: '',
		type: '',
		email: user.value?.email ?? '',
		contactPerson: user.value?.displayName ?? '',
		salary: '',
		desiredWeeklyHours: '',
		description: '',
	});

	const employmentTypes = [
		{ name: 'Full-Time', value: 'full time' },
		{ name: 'Part-Time', value: 'part time' },
		{ name: 'Internship', value: 'internship' },
		{ name: 'Contract', value: 'contract' },
		{ name: 'Freelance', value: 'freelance' },
		// { name: 'Other', value: 'other' },
	];

	const emits = defineEmits<{
		close: [];
	}>();

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		isLoading.value = true;
		const res = await $fetch<H3Response>('/api/employer/job', {
			method: 'POST',
			body: JSON.stringify({ ...event.data, employerUid: user.value?.uid }),
		});
		await refreshNuxtData('employer-jobs');
		toastResponse(res);
		emits('close');
		isLoading.value = false;
	}
</script>

<template>
	<UModal fullscreen>
		<UForm
			:schema="schema"
			:state="form"
			@submit.prevent="onSubmit"
			class="h-full">
			<UCard
				class="flex flex-col h-full"
				:ui="{
					ring: '',
					body: {
						base: 'h-full flex flex-col gap-2 overflow-auto',
					},
					rounded: 'rounded-none',
					shadow: 'shadow-none',
				}">
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
							Post a job
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="emits('close')" />
					</div>
				</template>

				<UFormGroup
					label="Company Name"
					name="companyName"
					required>
					<UInput
						placeholder="Enter company name"
						v-model="form.companyName" />
				</UFormGroup>
				<div class="flex md:flex-row flex-col gap-2 w-full">
					<UFormGroup
						label="Job title"
						name="title"
						class="w-full"
						required>
						<UInput
							placeholder="Who do you need?"
							v-model="form.title" />
					</UFormGroup>
					<UFormGroup
						label="Type of employment"
						name="type"
						class="w-full"
						required>
						<USelectMenu
							placeholder="Select employment"
							:options="employmentTypes"
							value-attribute="value"
							option-attribute="name"
							v-model="form.type" />
					</UFormGroup>
				</div>
				<div class="flex md:flex-row flex-col gap-2 w-full justify-between">
					<UFormGroup
						label="Email"
						name="email"
						class="w-full"
						required>
						<UInput
							color="primary"
							disabled
							placeholder="example@gmail.com"
							v-model="form.email" />
					</UFormGroup>
					<UFormGroup
						label="Contact person"
						name="contactPerson"
						class="w-full"
						required>
						<UInput
							color="primary"
							disabled
							placeholder="John Doe"
							v-model="form.contactPerson" />
					</UFormGroup>
				</div>
				<div class="flex md:flex-row flex-col gap-2 w-full justify-between">
					<UFormGroup
						label="Wage/Salary per month"
						name="salary"
						class="w-full"
						required>
						<UInput
							placeholder="Select employment"
							v-model="form.salary" />
					</UFormGroup>
					<UFormGroup
						label="Desired no. of hours per week"
						name="desiredWeeklyHours"
						class="w-full"
						required>
						<UInput
							placeholder="Select employment"
							v-model="form.desiredWeeklyHours" />
					</UFormGroup>
				</div>
				<UFormGroup
					label="Description"
					required
					name="description"
					class="col-span-1 md:col-span-2">
					<UTextarea
						class="h-52"
						:ui="{ form: 'h-full' }"
						placeholder="About Us:
	- Introduce your company, its mission, and what makes it unique.

Responsibilities:
	- Outline key tasks and projects.

Requirements:
	- List necessary skills, experience, and qualifications.

Benefits:
	- Highlight salary, perks, and work arrangements.

How to Apply:
	- Include application instructions and contact details."
						v-model="form.description" />
				</UFormGroup>

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
							label="Create job"
							:loading="isLoading" />
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>
