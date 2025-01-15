<script setup lang="ts">
	import { AdminSlideOver } from '#components';

	definePageMeta({
		layout: 'admin',
	});

	const slideOver = useSlideover();
</script>

<template>
	<div class="flex flex-col h-screen">
		<Navbar>
			<div class="flex gap-2 items-center">
				<UButton
					@click="slideOver.open(AdminSlideOver, { onClose: slideOver.close })"
					class="lg:hidden"
					icon="i-heroicons-bars-3"
					variant="ghost"
					color="white"
					size="sm"
				/>
				<label class="text-lg font-bold">Home</label>
			</div>
		</Navbar>
		<BuildingMessage />
	</div>
</template>
