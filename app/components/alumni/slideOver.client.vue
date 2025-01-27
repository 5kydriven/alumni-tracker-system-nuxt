<script setup lang="ts">
	const links = [
		{
			label: 'Home',
			to: '/alumni',
			click: () => emits('close'),
		},
		{
			label: 'Messages',
			to: '/alumni/messages',
			click: () => emits('close'),
		},
		{
			label: 'Job Board',
			to: '/alumni/jobs',
			click: () => emits('close'),
		},
	];

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<USlideover side="left">
		<div
			class="p-4 flex items-center justify-between border-b border-yellow-100 dark:border-gray-800">
			<div class="flex items-center gap-2">
				<NuxtImg
					src="/cpsu-logo.png"
					width="36"
					height="36" />
				<div class="text-lg font-bold text-white">CPSU</div>
			</div>
			<UButton
				:ui="{
					color: {
						white: {
							ghost:
								'text-white dark:text-white hover:bg-white dark:hover:bg-gray-900 hover:text-black',
						},
					},
				}"
				color="white"
				variant="ghost"
				size="sm"
				icon="i-heroicons-x-mark-20-solid"
				square
				padded
				@click="emits('close')" />
		</div>
		<UVerticalNavigation
			:links="links"
			class="py-4 px-2">
			<template #default="{ link }">
				<span class="group-hover:text-primary relative">{{ link.label }}</span>
			</template>
		</UVerticalNavigation>
	</USlideover>
</template>
