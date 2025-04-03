<script setup lang="ts">
	const props = defineProps<{ total: any }>();
</script>

<template>
	<div class="w-full flex gap-4 flex-col md:flex-row">
		<div class="flex gap-4 flex-col sm:flex-row w-full">
			<div
				class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
				<div
					class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
					<UIcon
						name="i-heroicons-user"
						class="w-6 h-6 text-zuccini" />
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total alumni</label>
					<span class="text-lg font-bold">{{ props.total.alumni }}</span>
				</div>
			</div>
			<div
				class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
				<div
					class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
					<UIcon
						name="i-heroicons-user"
						class="w-6 h-6 text-zuccini" />
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total employer</label>
					<span class="text-lg font-bold">{{ props.total.employer }}</span>
				</div>
			</div>
		</div>
		<div class="flex gap-4 flex-col sm:flex-row w-full">
			<div
				class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
				<div
					class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
					<UIcon
						name="i-heroicons-user"
						class="w-6 h-6 text-zuccini" />
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total personnel</label>
					<span class="text-lg font-bold">{{ props.total.personnel }}</span>
				</div>
			</div>
			<div
				class="border p-4 rounded-lg flex items-center justify-start gap-4 w-full shadow">
				<div
					class="p-2 rounded bg-zuccini-200/50 flex flex-col justify-center items-center">
					<UIcon
						name="i-heroicons-user"
						class="w-6 h-6 text-zuccini" />
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total jobs</label>
					<span class="text-lg font-bold">{{ props.total.job }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
