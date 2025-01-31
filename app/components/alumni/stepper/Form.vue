<script setup lang="ts">
	const user = useCurrentUser();
	const { toastResponse } = useToastComposables();
	const progres = ref(0);
	const isLoading = ref(false);
	const router = useRouter();

	const form = reactive<Alumni>({
		email: '',
		password: '',
		phoneNumber: '',
		province: '',
		city: '',
		zipCode: null,
		birthPlace: '',
		birthDate: '',
		maritalStatus: '',
		gender: null,
	});

	const maritalStatus = [
		'single',
		'married',
		'divorced',
		'widowed',
		'separated',
		'engaged',
		'other',
	];

	const stepFields = {
		'alumni-account': ['email'],
		'alumni-credential': [
			'province',
			'city',
			'zipCode',
			'birthPlace',
			'birthDate',
			'maritalStatus',
			'gender',
		],
	};

	const isValidStep = (step: string) => {
		const fields = stepFields[step];
		return fields.every((field: string) => {
			const value = form[field];
			return (
				value && (typeof value === 'string' ? value.trim().length > 0 : true)
			);
		});
	};

	const stepper = useStepper({
		'alumni-account': {
			title: 'Account Details',
			isValid: () => isValidStep('alumni-account') && form.password.length >= 6,
		},
		'alumni-credential': {
			title: 'Personal Details',
			isValid: () =>
				isValidStep('alumni-credential') && form.phoneNumber.length >= 10,
		},
		'alumni-done': {
			title: 'Account Updated',
			isValid: () => true,
		},
	});

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const input = target.value;
		target.value = input.replace(/\D/g, '');
		form.phoneNumber = target.value;
	};

	async function onSubmit() {
		if (stepper.isCurrent('alumni-done')) {
			router.replace('/alumni');
			return;
		}

		if (stepper.isCurrent('alumni-credential')) {
			isLoading.value = true;
			const res = await $fetch<H3Response>(`/api/alumni/${user.value.uid}`, {
				method: 'PUT',
				body: JSON.stringify({ ...form }),
			});
			isLoading.value = false;
			if (res.statusCode == 200) {
				stepper.goTo('alumni-done');
				progres.value++;
			} else {
				toastResponse(res);
			}
			return;
		}

		stepper.goToNext();
		progres.value++;
	}
</script>

<template>
	<div>
		<div class="flex justify-between w-full items-center p-4 relative">
			<div class="flex rounded-full p-1 z-10 bg-green-400">
				<UButton
					icon="i-heroicons-user"
					size="sm"
					color="black"
					:disabled="
						!stepper.get('alumni-credential').isValid() || stepper.isLast.value
					"
					variant="link"
					:padded="false"
					class="!text-black"
					@click="stepper.goTo('alumni-account')" />
			</div>
			<div
				class="flex rounded-full p-1 z-10"
				:class="progres >= 1 ? 'bg-green-400' : 'bg-gray-500'">
				<UButton
					icon="i-heroicons-document-text"
					size="sm"
					color="black"
					variant="link"
					:disabled="
						!stepper.get('alumni-credential').isValid() || stepper.isLast.value
					"
					:padded="false"
					@click="
						() => {
							stepper.goTo('alumni-credential');
							progres = 1;
						}
					"
					:class="progres >= 1 ? '!text-black' : ''" />
			</div>
			<div
				class="flex rounded-full p-1 z-10"
				:class="progres >= 2 ? 'bg-green-400' : 'bg-gray-500'">
				<UButton
					icon="i-heroicons-document-check"
					size="sm"
					color="black"
					variant="link"
					:padded="false"
					disabled
					:class="progres >= 2 ? '!text-black' : ''" />
			</div>
			<UProgress
				:value="progres"
				class="absolute left-0 z-0 px-4"
				:max="2" />
		</div>

		<form @submit.prevent="onSubmit">
			<div class="border rounded p-4 bg-white shadow">
				<h1 class="text-lg font-bold">{{ stepper.current.value.title }}</h1>
				<UDivider
					class="my-2"
					:ui="{ border: { base: 'dark:border-gray-500' } }" />

				<div
					class="flex flex-col gap-2"
					v-if="stepper.isCurrent('alumni-account')">
					<UFormGroup
						label="Email"
						required>
						<UInput
							placeholder="you@example.com"
							type="email"
							v-model="form.email" />
					</UFormGroup>
					<UFormGroup
						label="Password"
						required>
						<UInput
							placeholder="••••••••"
							type="password"
							v-model="form.password" />
					</UFormGroup>
				</div>

				<div
					class="flex flex-col gap-2"
					v-if="stepper.isCurrent('alumni-credential')">
					<div class="flex gap-2 items-center">
						<!-- <UAvatar size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar"
          :ui="{ rounded: 'rounded' }" /> -->
						<div class="flex flex-col gap-2 w-full">
							<UFormGroup label="Full Name">
								<UInput
									placeholder="John Doe"
									type="text"
									disabled
									v-model="user.displayName"
									:ui="{ form: 'capitalize' }" />
							</UFormGroup>
							<!-- <UFormGroup label="Last Name" >
            <UInput placeholder="you@example.com" />
          </UFormGroup> -->
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<UFormGroup
							label="Phone number"
							class="col-span-6"
							required>
							<UInput
								placeholder="9090909090"
								type="text"
								trim
								minLength="10"
								maxLength="10"
								@input="onInput">
								<template #leading>
									<span class="text-gray-500 dark:text-gray-400 text-xs"
										>+63</span
									>
								</template>
							</UInput>
						</UFormGroup>
						<UFormGroup
							label="Province"
							class="col-span-6"
							required>
							<UInput
								placeholder="you@example.com"
								type="text"
								v-model="form.province" />
						</UFormGroup>
						<UFormGroup
							label="Zip Code"
							class="col-span-6"
							required>
							<UInput
								placeholder="you@example.com"
								type="text"
								v-model="form.zipCode" />
						</UFormGroup>
						<UFormGroup
							label="City"
							class="col-span-6"
							required>
							<UInput
								placeholder="you@example.com"
								type="text"
								v-model="form.city" />
						</UFormGroup>
						<UFormGroup
							label="Date of birth"
							class="col-span-6"
							required>
							<UInput
								placeholder="you@example.com"
								type="text"
								v-model="form.birthDate" />
						</UFormGroup>
						<UFormGroup
							label="Place of birth"
							class="col-span-6"
							required>
							<UInput
								placeholder="you@example.com"
								type="text"
								v-model="form.birthPlace" />
						</UFormGroup>
						<UFormGroup
							label="Gender"
							class="col-span-6"
							required>
							<USelect
								placeholder="Select gender"
								v-model="form.gender"
								:options="['male', 'female', 'other']" />
						</UFormGroup>
						<UFormGroup
							label="Marital status"
							class="col-span-6"
							required>
							<USelect
								v-model="form.maritalStatus"
								placeholder="Select status"
								:options="maritalStatus" />
						</UFormGroup>
					</div>
				</div>

				<div
					class="flex flex-col items-center gap-4 justify-center h-40"
					v-if="stepper.isCurrent('alumni-done')">
					<UIcon
						name="i-heroicons-check-circle"
						class="w-16 h-16 text-primary" />
					<label class="text-lg font-semibold"
						>All your personal information has been updated successfully!</label
					>
				</div>
			</div>

			<UButton
				:loading="isLoading"
				:label="stepper.isLast.value ? 'Go to home' : 'Next'"
				type="submit"
				size="lg"
				:disabled="!stepper.current.value.isValid()"
				block
				class="mt-4" />
		</form>
	</div>
</template>
