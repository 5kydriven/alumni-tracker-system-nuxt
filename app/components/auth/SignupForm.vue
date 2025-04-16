<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types';

	const isLoading = ref(false);
	const { toastResponse } = useToastComposables();

	const schema = z.object({
		email: z.string().email('Invalid email'),
		companyName: z.string().min(1, 'Company name is required'),
		companyAddress: z.string().min(1, 'Company address is required'),
		numberBranches: z.number().optional(),
		numberEmployees: z.number().optional(),
		field: z.string(),
		description: z.string(),
		name: z.string().min(3, 'Name is required'),
		position: z.string().min(2, 'Position is required'),
		contactNumber: z
			.string()
			.min(10, 'Must be at least 10 characters')
			.max(11, 'maximum is 9 characters'),
		website: z.string().optional(),
		password: z.string().min(6, 'Must be at least 6 characters'),
		logo: z.any(),
		businessPermit: z.any(),
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
		dti: null as File | null,
		logo: null as File | null,
		businessPermit: null as File | null,
	});

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		isLoading.value = true;
		const formData = new FormData();
		const data: Schema = event.data;

		Object.entries(employer).forEach(([key, value]) => {
			if (
				key !== 'logo' &&
				key !== 'businessPermit' &&
				value !== null &&
				value !== undefined
			) {
				formData.append(key, String(value));
			}
		});

		if (employer.logo) {
			formData.append('logo', employer.logo);
		}
		if (employer.businessPermit) {
			formData.append('businessPermit', employer.businessPermit);
		}
		const res = await $fetch<H3Response>('/api/employer', {
			method: 'POST',
			body: formData,
		});
		toastResponse(res);
		isLoading.value = false;
		if (res.statusCode != 200) return;
		emit('success');
	}

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const input = target.value;
		target.value = input.replace(/\D/g, '');
	};

	function onLogoSelected(event: FileList) {
		if (event && event.length > 0) {
			employer.logo = event.item(0);
		}
	}

	function onPermitSelected(event: FileList) {
		if (event && event.length > 0) {
			employer.businessPermit = event.item(0);
		}
	}

	function onDtiSelected(event: FileList) {
		if (event && event.length > 0) {
			employer.dti = event.item(0);
		}
	}

	const emit = defineEmits(['success']);
	watch(employer, () => console.log(employer));
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
					name="telephoneNumber">
					<UInput
						:maxlength="10"
						@input="onInput"
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
				<UFormGroup label="logo">
					<UInput
						@change="onLogoSelected"
						type="file"
						accept=".png, .jpeg, .jpg" />
				</UFormGroup>
				<UFormGroup label="Business permit">
					<UInput
						@change="onPermitSelected"
						type="file"
						accept=".png, .jpeg, .jpg" />
				</UFormGroup>
				<UFormGroup label="Department of Trade and Industry (DTI)">
					<UInput
						@change="onDtiSelected"
						type="file"
						accept=".png, .jpeg, .jpg" />
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
						maxlength="10"
						@input="onInput"
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
