<script setup>
	import { signOut } from 'firebase/auth';
	import { ref } from 'vue';
	const auth = useFirebaseAuth();
	const links = ref([
		{
			label: 'Dashboard',
			labelClass: 'hover:text-black',
			icon: 'i-heroicons-chart-bar-solid',
			to: '/personnel',
		},
		{
			label: 'Alumni',
			labelClass: 'hover:text-black',
			icon: 'i-heroicons-users-solid',
			to: '/personnel/alumni',
		},
		{
			label: 'Messages',
			labelClass: 'hover:text-black',
			icon: 'i-heroicons-inbox-solid',
			to: '/personnel/messages',
		},
	]);

	function handleSignOut() {
		signOut(auth);
		clearNuxtData();
	}
</script>

<template>
	<div class="h-screen flex">
		<aside
			class="w-[225px] flex-col hidden lg:flex bg-zuccini-500 h-full px-4 xl:w-[250px] shrink-0">
			<div class="h-16 flex items-center gap-2 py-4">
				<NuxtImg
					src="/cpsu-logo.png"
					width="36"
					height="36" />
				<label class="font-bold text-white text-xl">CPSU</label>
			</div>
			<UDivider />
			<UVerticalNavigation
				:links="links"
				class="grow py-2">
				<template #default="{ link }">
					<span class="group-hover:text-black relative">{{ link.label }}</span>
				</template>
			</UVerticalNavigation>
			<div class="py-4">
				<UButton
					@click="handleSignOut"
					label="Sign out"
					icon="i-heroicons-arrow-left-end-on-rectangle"
					variant="solid"
					class="w-full text-black"
					color="yellow" />
			</div>
		</aside>
		<div class="flex flex-col h-full flex-1 overflow-auto">
			<slot />
		</div>
	</div>
</template>
