<script setup lang="ts">
	import { format } from 'date-fns';

	definePageMeta({
		middleware: ['personnel'],
		layout: 'personnel',
	});

	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const { uid } = useRoute().params;

	const { data: response, status } = useFetch<
		H3Response<User<AlumniCredentials>>
	>(`/api/personnel/alumni/${uid}`, {
		key: `alumni-${uid}`,
		method: 'GET',
		getCachedData: (key) =>
			nuxtApp.payload.data?.[key] ?? nuxtApp.static.data?.[key] ?? null,
	});

	const { data: survey } = useFetch<H3Response<Survey>>(
		`/api/personnel/alumni/survey/${uid}`,
	);

	// Extracting user data with default values
	const alumni = computed(() => response.value?.data || {});
	const credentials = computed(() => alumni.value.userCredentials || {});

	// Format birthdate if available
	const formattedBirthDate = computed(() => {
		return credentials.value.birthDate
			? format(credentials.value.birthDate, 'MMMM d, yyyy')
			: 'N/A';
	});
</script>

<template>
	<UCard
		:ui="{
			base: 'h-full',
			background: 'bg-gray-100',
			body: { base: 'flex flex-col gap-4' },
			rounded: 'rounded-none',
			header: { base: 'bg-gray-300 shadow h-16 p-4' },
		}">
		<template #header>
			<label class="font-lg font-bold">Alumni Profile</label>
		</template>

		<UButton
			@click="router.back()"
			label="Back"
			variant="link"
			icon="i-heroicons-chevron-left" />

		<!-- Loading Indicator -->
		<div
			v-if="status !== 'success'"
			class="font-bold text-lg">
			Loading...
		</div>

		<!-- Alumni Info -->
		<div
			v-else
			class="flex gap-4 items-center border rounded-lg p-4 bg-white shadow-lg">
			<UAvatar
				:alt="alumni.name?.toUpperCase()"
				size="2xl"
				:ui="{ rounded: 'rounded-lg' }" />
			<div class="flex flex-col gap-2">
				<label class="font-bold lg:text-2xl capitalize">{{
					alumni.name || 'N/A'
				}}</label>
				<div class="flex gap-2 items-center">
					<UBadge variant="soft">{{ credentials.status || 'Unknown' }}</UBadge>
					<span class="border-x px-2 uppercase">{{
						credentials.course || 'N/A'
					}}</span>
					<span>{{ credentials.batch || 'N/A' }}</span>
				</div>
			</div>
		</div>

		<!-- Personal Details -->
		<div
			v-if="status === 'success'"
			class="flex flex-col gap-4 p-4 rounded-lg border bg-white shadow-lg">
			<div class="lg:text-xl text-lg font-bold">Personal Details</div>
			<div class="flex justify-between items-center">
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Email:</label>
						<span class="text-sm">{{ alumni.email || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Phone Number:</label>
						<span class="text-sm">{{ credentials.phoneNumber || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Marital Status:</label>
						<span class="text-sm">{{
							credentials.maritalStatus || 'N/A'
						}}</span>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Gender:</label>
						<span class="text-sm">{{ credentials.gender || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Birth Date:</label>
						<span class="text-sm">{{ formattedBirthDate }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Birth Place:</label>
						<span class="text-sm">{{ credentials.birthPlace || 'N/A' }}</span>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Province:</label>
						<span class="text-sm">{{ credentials.province || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">City:</label>
						<span class="text-sm">{{ credentials.city || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-semibold">Zip Code:</label>
						<span class="text-sm">{{ credentials.zipCode || 'N/A' }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Employment Details -->
		<div
			v-if="
				survey?.data?.employmentStatus == 'employed' ||
				survey?.data?.employmentStatus == 'self-employed' ||
				survey?.data?.employmentStatus == 'freelancer'
			"
			class="flex flex-col gap-4 p-4 rounded-lg border bg-white shadow-lg">
			<div class="lg:text-xl text-lg font-bold">Employment Details</div>
			<div
				class="flex flex-wrap gap-2 justify-between"
				v-if="survey?.data?.employmentStatus == 'employed'">
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Company Name:</label>
					<span class="text-sm">{{ survey?.data?.companyName }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Company Address:</label>
					<span class="text-sm">{{ survey?.data?.companyAddress }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Employment Type:</label>
					<span class="text-sm">{{ survey?.data?.employmentType }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Years in current job:</label>
					<span class="text-sm">{{ survey?.data?.yearsInJob }}</span>
				</div>
			</div>
			<div
				class="flex flex-wrap gap-2"
				v-if="survey?.data?.employmentStatus == 'freelancer'">
				<label>Freelancer</label>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Job title / Profession</label>
					<span class="text-sm">{{ survey?.data?.jobTitle }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Nature of Work / Services Offered</label>
					<span class="text-sm">{{ survey?.data?.workNature }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Portfolio / Website</label>
					<span class="text-sm">{{ survey?.data?.urlLink }}</span>
				</div>
			</div>
			<div
				class="flex flex-wrap gap-2"
				v-if="survey?.data?.employmentStatus == 'self-employed'">
				<label>Self-Employed</label>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Bussiness Name</label>
					<span class="text-sm">{{ survey?.data?.bussinessName }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Nature of Bussiness</label>
					<span class="text-sm">{{ survey?.data?.workNature }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Is business registered?</label>
					<span class="text-sm">{{ survey?.data?.isRegistered }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Years in business</label>
					<span class="text-sm">{{ survey?.data?.yearsInJob }}</span>
				</div>
				<div class="flex gap-2 items-center">
					<label class="font-semibold">Business Website / Social Media</label>
					<span class="text-sm">{{ survey?.data?.urlLink }}</span>
				</div>
			</div>
		</div>
	</UCard>
</template>
