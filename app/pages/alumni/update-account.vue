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
				).length > 10,
		},
		'alumni-survey': {
			title: 'Survey Form',
			isValid: () =>
				store.survey.employmentStatus != undefined && store.form.isAgree,
		},
		'alumni-done': {
			title: 'Account Updated',
			isValid: () => true,
		},
	});

	async function onSubmit() {
		if (stepper.isCurrent('alumni-done')) {
			signOut(auth as Auth);
			router.replace('/auth');
			reloadNuxtApp();
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

		store.progress++;
		stepper.goToNext();
	}
</script>

<template>
	<main class="bg-gray-100 h-screen">
		<div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
			<h1 class="text-xl text-center p-4">Personal Details</h1>

			<div>
				<div class="flex justify-between w-full items-center p-4 relative">
					<div class="flex rounded-full p-1 z-10 bg-green-400">
						<UIcon
							name="i-heroicons-user"
							class="w-6 h-6"
							color="black"
							variant="link" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 1 ? 'bg-green-400' : 'bg-gray-500'">
						<UIcon
							name="i-heroicons-document-text"
							color="black"
							variant="link"
							class="w-6 h-6" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 2 ? 'bg-green-400' : 'bg-gray-500'">
						<UIcon
							name="i-heroicons-document-text"
							size="sm"
							color="black"
							variant="link"
							class="w-6 h-6" />
					</div>
					<div
						class="flex rounded-full p-1 z-10"
						:class="store.progress >= 3 ? 'bg-green-400' : 'bg-gray-500'">
						<UIcon
							name="i-heroicons-document-check"
							size="sm"
							color="black"
							variant="link"
							class="w-6 h-6" />
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
						:label="stepper.isLast.value ? 'Go to sign In' : 'Next Step'"
						type="submit"
						size="lg"
						:disabled="!stepper.current.value.isValid()"
						block
						class="mt-4" />
				</form>
			</div>
			<UButton
				label="Go Back"
				size="lg"
				block
				@click="
					() => {
						store.progress--;
						stepper.goToPrevious();
					}
				"
				v-show="!stepper.isCurrent('alumni-account')" />
			<!-- <UButton
				label="sign out"
				size="lg"
				block
				@click="signOut(auth as Auth)" /> -->
		</div>
	</main>
</template>
