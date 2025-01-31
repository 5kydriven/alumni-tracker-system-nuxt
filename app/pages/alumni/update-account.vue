<script setup lang="ts">
	import { signOut, type Auth } from 'firebase/auth';

	const auth = useFirebaseAuth();
</script>

<template>
	<main class="bg-gray-100 h-screen">
		<div class="max-w-2xl mx-auto p-4 flex flex-col gap-4 lg:py-8">
			<h1 class="text-xl text-center p-4">Personal Details</h1>

			<AlumniStepperForm />
			<UButton
				@click="signOut(auth as Auth)"
				label="sign out(debugging)" />
		</div>
	</main>
</template>
