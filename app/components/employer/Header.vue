<script setup lang="ts">
	const user = useCurrentUser();
	const employer = ref<User<EmployerCredentials>>();

	const { data: result } = useFetch<H3Response<User>>(
		`/api/employer/${user.value?.uid}`,
	);

	watch(result, () => {
		employer.value = result.value?.data;
	});
</script>

<template>
	<h1 class="text-xl font-bold">Hello, {{ user?.displayName }}</h1>
	<div class="border rounded-lg shadow-lg bg-white p-4 flex gap-4">
		<UAvatar
			:alt="employer?.name?.toUpperCase()"
			:ui="{
				rounded: 'rounded-lg',
			}"
			size="xl" />
		<div class="flex flex-col gap-2">
			<div class="flex flex-col">
				<label class="text-xl font-bold">{{ employer?.name }}</label>
				<div class="flex gap-2 items-center">
					<UIcon name="i-heroicons-building-office" />
					<p class="text-sm">{{ employer?.userCredentials?.companyName }}</p>
				</div>
				<div class="flex gap-2 items-center">
					<UIcon name="i-heroicons-map-pin" />
					<p class="text-sm">{{ employer?.userCredentials?.companyAddress }}</p>
				</div>
				<div class="flex gap-2 items-center">
					<UIcon name="i-heroicons-phone" />
					<p class="text-sm">{{ employer?.userCredentials?.contactNumber }}</p>
				</div>
				<div class="flex gap-2 items-center">
					<UIcon name="i-heroicons-envelope" />
					<p class="text-sm">{{ employer?.email }}</p>
				</div>
			</div>
			<div class="text-sm flex flex-col">
				<label class="text-lg font-bold">About</label>
				<p>{{ employer?.userCredentials?.description }}</p>
			</div>
		</div>
	</div>
</template>
