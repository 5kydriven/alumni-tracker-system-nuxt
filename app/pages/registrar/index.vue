<script setup lang="ts">
	import { RegistrarSlideOver } from '#components';

	definePageMeta({
		layout: 'registrar',
	});

	const slideOver = useSlideover();
</script>

<template>
	<div class="flex flex-col h-screen">
		<Navbar class="gap-2 bg-gray-300">
			<UButton
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				class="md:hidden"
				icon="i-heroicons-bars-3"
				variant="ghost"
				color="white"
				size="sm"
			/>
			<label class="font-bold text-lg">Home</label>
		</Navbar>
		<div class="w-full p-8 flex justify-between">
			<div class="border p-4 rounded-lg flex items-start gap-2">
				<UIcon name="i-heroicons-user" />
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-500">Total alumni</label>
					<span class="text-lg font-bold">5000</span>
				</div>
			</div>
			<div class="border p-4 rounded-lg flex flex-col gap-2">
				<UIcon name="i-heroicons-user" />
				<label class="text-sm text-gray-500">Total employed</label>
				<span class="text-lg font-bold">5000</span>
			</div>
			<div class="border p-4 rounded-lg flex flex-col gap-2">
				<UIcon name="i-heroicons-user" />
				<label class="text-sm text-gray-500">Total unemployed</label>
				<span class="text-lg font-bold">5000</span>
			</div>
			<div class="border p-4 rounded-lg flex flex-col gap-2">
				<UIcon name="i-heroicons-user" />
				<label class="text-sm text-gray-500">Total unknown</label>
				<span class="text-lg font-bold">5000</span>
			</div>
		</div>
		<ChartGroupedBar
			:data="[
				{ year: 2022, employed: 10, unemployed: 1, unknown: 1 },
				{ year: 2023, employed: 20, unemployed: 5, unknown: 2 },
				{ year: 2024, employed: 1, unemployed: 2, unknown: 3 },
				{ year: 2025, employed: 4, unemployed: 3, unknown: 1 },
			]"
		/>
		<!-- <BuildingMessage /> -->
	</div>
</template>
