<script setup lang="ts">
	import { signOut, type Auth } from 'firebase/auth';

	const auth = useFirebaseAuth();

	const links = ref([
		{
			label: 'Dashboard',
			to: '/admin',
			click: () => emits('close'),
		},
		{
			label: 'User',
			to: '/admin/users',
			click: () => emits('close'),
		},
	]);

	function handleSignOut() {
		emits('close');
		signOut(auth as Auth);
	}

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
			class="grow py-2 px-4">
			<template #default="{ link }">
				<span class="group-hover:text-black relative">{{ link.label }}</span>
			</template>
		</UVerticalNavigation>
		<div class="p-4">
			<UButton
				@click="handleSignOut"
				label="Sign out"
				icon="i-heroicons-arrow-left-end-on-rectangle"
				variant="solid"
				class="w-full text-black"
				color="yellow" />
		</div>
	</USlideover>
</template>
