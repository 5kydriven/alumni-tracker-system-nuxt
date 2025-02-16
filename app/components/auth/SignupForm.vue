<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types';

	const isLoading = ref(false);
	const { toastResponse } = useToastComposables();

	const schema = z.object({
		email: z.string().email('Invalid email'),
		companyName: z.string(),
		companyAddress: z.string(),
		telephoneNumber: z.string().min(9, 'Must be at least 9 characters'),
		numberBranches: z.number().optional(),
		numberEmployees: z.number().optional(),
		field: z.string(),
		description: z.string(),
		name: z.string(),
		position: z.string(),
		contactNumber: z
			.string()
			.min(10, 'Must be at least 10 characters')
			.max(11, 'maximum is 9 characters'),
		website: z.string().optional(),
		password: z.string().min(6, 'Must be at least 6 characters'),
	});

	type Schema = z.output<typeof schema>;

	const employer = reactive({
		companyName: '',
		companyAddress: '',
		website: '',
		telephoneNumber: '',
		numberBranches: 0,
		numberEmployees: 0,
		field: '',
		description: '',
		position: '',
		contactNumber: '',
		name: '',
		email: '',
		password: '',
	});

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		isLoading.value = true;
		const res = await $fetch<H3Response>('/api/employer', {
			method: 'POST',
			body: JSON.stringify(event.data),
		});
		toastResponse(res);
		isLoading.value = false;
		if (res.statusCode != 200) return;
		emit('success');
	}
	const emit = defineEmits(['success']);
</script>

<template>
	<UForm
		@submit="onSubmit"
		:state="employer"
		:schema="schema"
		class="w-full border-2 rounded-lg bg-white shadow-lg p-4 flex-col border-primary-500 flex gap-4">
		<div class="flex flex-col gap-4">
			<label class="text-lg font-bold bg-gray-100 text-primary-500 p-2 rounded"
				>Academic Partner Sign Up Form</label
			>
			<span
				>To apply, complete the required fields on this form and click "Submit"
				when finished.</span
			>
		</div>
		<div class="flex flex-col gap-2">
			<label class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
				>Contact Information</label
			>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
				<UFormGroup
					label="Company"
					name="companyName"
					required>
					<UInput
						type="text"
						v-model="employer.companyName"
						placeholder="Central Philippines State Universities"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Company Address"
					name="companyAddress"
					required>
					<UInput
						type="text"
						v-model="employer.companyAddress"
						placeholder="San Carlos City, Negros Occidental"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Website"
					name="website">
					<UInput
						type="text"
						v-model="employer.website"
						placeholder="website.com"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Telephone Number"
					name="telephoneNumber"
					required>
					<UInput
						type="text"
						v-model="employer.telephoneNumber"
						placeholder="+63 (XX) YYY ZZZZ"></UInput>
				</UFormGroup>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<label class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
				>Bussiness Information</label
			>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
				<UFormGroup
					label="Number of Branches"
					name="numberBranches">
					<UInput
						type="number"
						v-model="employer.numberBranches"
						placeholder="12"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Number of Employees"
					name="numberEmployees">
					<UInput
						type="number"
						v-model="employer.numberEmployees"
						placeholder="100"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Select your field"
					name="field"
					required>
					<UInput
						type="text"
						v-model="employer.field"
						placeholder="Education"></UInput>
				</UFormGroup>
				<UFormGroup
					label="logo"
					name="logo">
					<UInput type="file"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Bussiness permit"
					name="bussinessPermit">
					<UInput type="file"></UInput>
				</UFormGroup>
				<UFormGroup
					class="md:col-span-2"
					label="Brief description"
					name="description"
					required>
					<UTextarea
						type="text"
						v-model="employer.description"
						placeholder="give a description of your company"></UTextarea>
				</UFormGroup>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<label class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
				>Contact Details</label
			>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
				<UFormGroup
					label="Acomplished by"
					name="name"
					class="md:col-span-2"
					required>
					<UInput
						type="text"
						v-model="employer.name"
						placeholder="John Doe"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Position"
					name="position"
					required>
					<UInput
						type="text"
						v-model="employer.position"
						placeholder="Admin Assistant"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Contact Number"
					name="contactNumber"
					required>
					<UInput
						type="text"
						v-model="employer.contactNumber"
						placeholder="(XXX) YYY ZZZZ">
						<template #leading>
							<span class="text-gray-500 text-xs"> +63 </span>
						</template>
					</UInput>
				</UFormGroup>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<label class="font-bold bg-primary-500 py-1 px-2 text-yellow-500 rounded"
				>Account Details</label
			>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
				<UFormGroup
					label="Email Address"
					name="email"
					required>
					<UInput
						type="text"
						v-model="employer.email"
						placeholder="example@gmail.com"></UInput>
				</UFormGroup>
				<UFormGroup
					label="Password"
					name="password"
					required>
					<UInput
						type="password"
						v-model="employer.password"></UInput>
				</UFormGroup>
			</div>
		</div>
		<UButton
			block
			class="mt-4"
			type="submit"
			:loading="isLoading"
			>Submit
		</UButton>
		<!-- <UButton
			variant="link"
			to="/auth/finish"
			>Finish</UButton
		> -->
	</UForm>
</template>
