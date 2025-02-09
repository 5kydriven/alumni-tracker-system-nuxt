<script setup lang="ts">
	import { AlumniAddEducation, AlumniAddExperience } from '#components';

	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const user = useCurrentUser();
	const modal = useModal();

	const { data: alumni } = useLazyFetch<H3Response<User<AlumniCredentials>>>(
		`/api/alumni/${user.value?.uid}`,
		{
			key: 'alumni-profile',
			method: 'GET',
		},
	);
</script>

<template>
	<div class="flex flex-col gap-4 p-4 lg:max-w-screen-xl lg:mx-auto w-full">
		<AlumniProfile v-bind="alumni?.data" />

		<div
			class="flex flex-col gap-4 w-full bg-white border-gray-300 border py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<label class="font-bold text-lg">Experience</label>
			<div
				class="flex flex-col gap-2"
				v-if="false">
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center items-center p-8"
				v-else>
				<UButton
					icon="i-heroicons-plus"
					size="sm"
					label="Add experience"
					@click="
						modal.open(AlumniAddExperience, {
							onClose: modal.close,
							uid: alumni?.data?.uid,
						})
					"
					variant="soft" />
			</div>
		</div>

		<div
			class="flex flex-col gap-4 w-full bg-white border border-gray-300 py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<label class="font-bold text-lg">Education</label>
			<div
				class="flex flex-col gap-2"
				v-if="false">
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
				<div class="flex items-start gap-2">
					<UAvatar
						label="P"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col">
						<label class="font-bold">Information Technology Intern</label>
						<span class="font-thin">Newfold Digital</span>
						<span class="dark:text-gray-400 text-xs"
							>Oct 2023 - present . 1 yr 1 mo</span
						>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center items-center p-8"
				v-else>
				<UButton
					icon="i-heroicons-plus"
					size="sm"
					@click="
						modal.open(AlumniAddEducation, {
							onClose: modal.close,
							uid: alumni?.data?.uid,
						})
					"
					label="Add education"
					variant="soft" />
			</div>
		</div>
	</div>
</template>
