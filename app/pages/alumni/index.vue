<script setup lang="ts">
	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const user = useCurrentUser();
	const { data: alumni } = useFetch<H3Response<User>>(
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
			<div class="flex flex-col gap-2">
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
		</div>

		<div
			class="flex flex-col gap-4 w-full bg-white border border-gray-300 py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<label class="font-bold text-lg">Education</label>
			<div class="flex flex-col gap-2">
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
		</div>
	</div>
</template>
