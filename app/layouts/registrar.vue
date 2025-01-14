<script setup>
	import { signOut } from 'firebase/auth';
	import { ref } from 'vue';
	const auth = useFirebaseAuth();
	const links = ref([
		{
			label: 'Dashboard',
			labelClass: 'hover:text-black',
			to: '/registrar',
		},
		{
			label: 'Alumni',
			labelClass: 'hover:text-black',
			to: '/registrar/alumni-list',
		},
		{
			label: 'Messages',
			labelClass: 'hover:text-black',
			to: '/registrar/messages/',
		},
	]);
</script>

<template>
	<div class="w-full flex h-screen">
		<aside class="w-[250px] flex-col hidden md:flex bg-zuccini-500 h-full px-4">
			<div class="h-16 flex items-center gap-2">
				<NuxtImg
					src="/cpsu-logo.png"
					width="36"
					height="36"
				/>
				<label class="font-bold text-white">CPSU</label>
			</div>
			<UVerticalNavigation
				:links="links"
				class="grow py-2"
			>
				<template #default="{ link }">
					<span class="group-hover:text-black relative">{{ link.label }}</span>
				</template>
			</UVerticalNavigation>
			<div class="py-4">
				<UButton
					@click="signOut(auth)"
					label="Sign out"
					icon="i-heroicons-arrow-left-end-on-rectangle"
					variant="solid"
					class="w-full text-black"
					color="yellow"
				/>
			</div>
		</aside>
		<div class="flex flex-col w-full">
			<slot />
		</div>
	</div>
</template>
