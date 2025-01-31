<script setup lang="ts">
	definePageMeta({
		middleware: ['personel'],
		layout: 'registrar',
	});

	const nuxtApp = useNuxtApp();
	const { uid } = useRoute().params;

	const { data: alumni, status } = useFetch<H3Response<User<Alumni>>>(
		`/api/registrar/alumni/${uid}`,
		{
			key: `alumni-${uid}`,
			method: 'GET',
			getCachedData: (key) => {
				const cachedData =
					nuxtApp.payload.data[key] || nuxtApp.static.data[key];
				if (cachedData) {
					return cachedData;
				}
				return null;
			},
		},
	);
</script>

<template>
	<UCard
		:ui="{
			base: 'h-full',
			background: 'bg-gray-100 ',
			body: {
				base: 'flex flex-col gap-4',
			},
			rounded: 'rounded-none',
			header: {
				base: 'bg-gray-300 shadow  h-16 p-4',
			},
		}">
		<template #header>
			<label class="font-lg font-bold"> Alumni Profile </label>
		</template>

		<div
			class="font-bold text-lg"
			v-show="status != 'success'">
			loading...
		</div>

		<div
			class="flex gap-4 items-center border rounded-lg p-4 bg-white"
			v-show="status == 'success'">
			<UAvatar
				alt="Test"
				size="2xl"
				:ui="{
					rounded: 'rounded-lg',
				}" />
			<div class="flex flex-col gap-2">
				<label class="font-bold lg:text-2xl capitalize">{{
					alumni?.data?.name || 'N/A'
				}}</label>
				<div class="flex gap-2 items-center">
					<UBadge variant="soft">Unknown</UBadge>
					<span class="border-x px-2 uppercase">{{
						alumni?.data?.course || 'N/A'
					}}</span>
					<span>{{ alumni?.data?.batch || 'N/A' }}</span>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col gap-4 p-4 rounded-lg border bg-white"
			v-show="status == 'success'">
			<div class="lg:text-xl font-bold">Personal Details</div>
			<div class="flex justify-between items-center">
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-bold">Email: </label>
						<span>{{ alumni?.data?.email || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">Phone Number: </label>
						<span>{{
							alumni?.data?.userCredentials?.phoneNumber || 'N/A'
						}}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">Marital Status: </label>
						<span>{{
							alumni?.data?.userCredentials?.maritalStatus || 'N/A'
						}}</span>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-bold">Gender: </label>
						<span>{{ alumni?.data?.userCredentials?.gender || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">Birth Date: </label>
						<span>{{ alumni?.data?.userCredentials?.birthDate || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">Birth Place: </label>
						<span>{{
							alumni?.data?.userCredentials?.birthPlace || 'N/A'
						}}</span>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<div class="flex gap-2 items-center">
						<label class="font-bold">Province: </label>
						<span>{{ alumni?.data?.userCredentials?.province || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">City: </label>
						<span>{{ alumni?.data?.userCredentials?.zipCode || 'N/A' }}</span>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold">Zip Code: </label>
						<span>{{ alumni?.data?.userCredentials?.zipCode || 'N/A' }}</span>
					</div>
				</div>
			</div>
		</div>
	</UCard>
</template>
