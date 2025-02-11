<script setup lang="ts">
	const props = defineProps<{
		title?: Job['title'];
		contactPerson?: Job['contactPerson'];
		email?: Job['email'];
		description?: Job['description'];
		employerUid?: Job['employerUid'];
		uid?: Job['uid'];
		companyName?: Job['companyName'];
		applicants?: Job['applicants'];
		alumni?: User<AlumniCredentials>;
	}>();

	const isLoading = ref(false);
	const { toastResponse } = useToastComposables();

	const hasApplied = computed(() => {
		return props.applicants?.includes(props.alumni?.uid ?? '') ?? false;
	});

	const isApplicable = computed(() => {
		return props.alumni?.userCredentials?.description !== '';
	});

	async function onApplied() {
		isLoading.value = true;
		const res = await $fetch<H3Response>(`/api/alumni/message`, {
			method: 'POST',
			body: JSON.stringify({
				employerUid: props.employerUid,
				alumniUid: props.alumni?.uid,
				alumniName: props.alumni?.name,
				jobUid: props.uid,
				employerName: props.contactPerson,
				companyName: props.companyName,
				jobTitle: props.title,
			}),
		});
		await refreshNuxtData(`job-${props.uid}`);
		toastResponse(res);
		isLoading.value = false;
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div
			v-if="!isApplicable"
			class="border-red-300 border-2 bg-red-500/20 p-2 text-center text-red-500 rounded-lg">
			<span>Complete all your information to apply a job</span>
		</div>
		<div
			class="flex-1 flex flex-col bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
			<div
				class="flex justify-between items-center w-full flex-wrap gap-4 md:gap-0">
				<div class="flex items-center gap-2">
					<UAvatar
						:alt="props.title"
						:ui="{ rounded: 'rounded' }"
						size="lg" />
					<div class="flex flex-col">
						<label class="capitalize text-lg font-bold">{{
							props.title
						}}</label>
						<span class="text-sm text-gray-500"
							>{{ props.contactPerson }} ({{ props.email }})</span
						>
					</div>
				</div>
				<div class="md:w-fit w-full">
					<UButton
						:loading="isLoading"
						block
						:label="hasApplied ? 'Applied' : 'Apply'"
						:disabled="!isApplicable || hasApplied"
						@click="onApplied" />
				</div>
			</div>
			<UDivider class="mt-2 mb-4" />
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<p v-html="props.description?.replace(/\n/g, '<br>')"></p>
				</div>
			</div>
		</div>
	</div>
</template>
