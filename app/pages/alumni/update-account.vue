<script setup lang="ts">
	import { signOut, type Auth } from 'firebase/auth';

	const { toastResponse } = useToastComposables();
	const auth = useFirebaseAuth();
	const router = useRouter();
	const store = useStepperStore();
	const user = useCurrentUser();

	const isLoading = ref(false);

	const stepper = useStepper({
		'alumni-account': {
			title: 'Account Details',
			isValid: () =>
				store.isValidStep('alumni-account') &&
				(store.form.password?.length ?? 0) >= 6,
		},
		'alumni-credential': {
			title: 'Personal Details',
			isValid: () =>
				store.isValidStep('alumni-credential') &&
				(
					(store.form.userCredentials as AlumniCredentials)
						.phoneNumber as string
				).length >= 10,
		},
		'alumni-survey': {
			title: 'Survey Form',
			isValid: () => store.survey.employmentStatus != undefined,
		},
		'alumni-done': {
			title: 'Account Updated',
			isValid: () => true,
		},
	});

	async function onSubmit() {
		if (stepper.isCurrent('alumni-done')) {
			router.push('/alumni');
			return;
		}

		if (stepper.isCurrent('alumni-survey')) {
			isLoading.value = true;
			const res = await $fetch<H3Response>(`/api/alumni/${user.value?.uid}`, {
				method: 'PUT',
				body: JSON.stringify({
					form: { ...store.form },
					survey: { ...store.survey },
				}),
			});
			isLoading.value = false;
			if (res.statusCode == 200) {
				stepper.goTo('alumni-done');
				store.progress++;
			} else {
				toastResponse(res);
			}
			return;
		}

		stepper.goToNext();
		store.progress++;
	}
</script>

<template>
	<main class="bg-gray-100 h-screen">
		<div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
			<h1 class="text-xl text-center p-4">Personal Details</h1>

			<div>
				<div class="flex justify-between w-full items-center p-4 relative">
					<div class="flex rounded-full p-1 z-10 bg-green-400">
						<UButton
							icon="i-heroicons-user"
							size="sm"
							color="black"
							disabled
							variant="link"
							:padded="false"
							class="!text-black"
							@click="stepper.goTo('alumni-account')" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 1 ? 'bg-green-400' : 'bg-gray-500'">
						<UButton
							icon="i-heroicons-document-text"
							size="sm"
							color="black"
							variant="link"
							disabled
							:padded="false"
							@click="
								() => {
									stepper.goTo('alumni-credential');
									store.progress = 1;
								}
							"
							:class="store.progress >= 1 ? '!text-black' : ''" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 2 ? 'bg-green-400' : 'bg-gray-500'">
						<UButton
							icon="i-heroicons-document-text"
							size="sm"
							color="black"
							variant="link"
							:padded="false"
							disabled
							:class="store.progress >= 2 ? '!text-black' : ''" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 3 ? 'bg-green-400' : 'bg-gray-500'">
						<UButton
							icon="i-heroicons-document-check"
							size="sm"
							color="black"
							variant="link"
							:padded="false"
							disabled
							:class="store.progress >= 3 ? '!text-black' : ''" />
					</div>
					<UProgress
						:value="store.progress"
						class="absolute left-0 z-0 px-4"
						:max="3" />
				</div>

				<form @submit.prevent="onSubmit">
					<div class="border rounded p-4 bg-white shadow">
						<h1 class="text-lg font-bold">{{ stepper.current.value.title }}</h1>
						<UDivider
							class="my-2"
							:ui="{ border: { base: 'dark:border-gray-500' } }" />

						<AlumniStepperAccount v-if="stepper.isCurrent('alumni-account')" />

						<AlumniStepperCredentials
							:name="user?.displayName as string"
							v-else-if="stepper.isCurrent('alumni-credential')" />

						<AlumniStepperSurvey
							v-else-if="stepper.isCurrent('alumni-survey')" />

						<AlumniStepperLast v-else />
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
			<UButton
				@click="signOut(auth as Auth)"
				label="sign out(debugging)" />
		</div>
	</main>
</template>
