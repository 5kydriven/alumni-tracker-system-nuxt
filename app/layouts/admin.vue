<script setup>
	import { signOut } from 'firebase/auth';
	import { ref } from 'vue';
	const auth = useFirebaseAuth();
	const links = ref([
		{
			label: 'Dashboard',
			to: '/admin',
		},
		{
			label: 'User',
			to: '/admin/users',
		},
	]);
</script>

<template>
	<div class="flex h-screen">
		<aside
			class="hidden w-[250px] flex-col lg:flex bg-zuccini-500 h-screen px-4">
			<div class="h-16 flex items-center gap-2">
				<NuxtImg
					src="/cpsu-logo.png"
					width="36"
					height="36" />
				<label class="font-bold text-white">CPSU</label>
			</div>
			<UVerticalNavigation
				:links="links"
				class="grow py-2">
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
					color="yellow" />
			</div>
		</aside>
		<div class="flex flex-col h-full flex-1 overflow-auto">
			<slot />
		</div>
	</div>
</template>
