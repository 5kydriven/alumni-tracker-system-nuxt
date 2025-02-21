<script setup lang="ts">
	const props = defineProps<{ total: any }>();
</script>

<template>
	<div class="w-full flex gap-4">
		<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
			<UIcon name="i-heroicons-user" />
			<div class="flex flex-col gap-2">
				<label class="text-sm text-gray-500">Total alumni</label>
				<span class="text-lg font-bold">{{ props.total.alumni }}</span>
			</div>
		</div>
		<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
			<UIcon name="i-heroicons-user" />
			<div class="flex flex-col gap-2">
				<label class="text-sm text-gray-500">Total employer</label>
				<span class="text-lg font-bold">{{ props.total.employer }}</span>
			</div>
		</div>
		<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
			<UIcon name="i-heroicons-user" />
			<div class="flex flex-col gap-2">
				<label class="text-sm text-gray-500">Total personel</label>
				<span class="text-lg font-bold">{{ props.total.registrar }}</span>
			</div>
		</div>
		<div class="border p-4 rounded-lg flex items-start gap-2 w-full">
			<UIcon name="i-heroicons-user" />
			<div class="flex flex-col gap-2">
				<label class="text-sm text-gray-500">Total jobs</label>
				<span class="text-lg font-bold">{{ props.total.job }}</span>
			</div>
		</div>
	</div>
</template>
