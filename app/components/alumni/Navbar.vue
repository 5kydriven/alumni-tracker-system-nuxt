<script setup lang="ts">
	import { AlumniSlideOver } from '#components';
	import { signOut, type Auth } from 'firebase/auth';

	const auth = useFirebaseAuth();
	const slideover = useSlideover();

	const navLinks = [
		{
			label: 'Home',
			to: '/alumni',
		},
		{
			label: 'Messages',
			to: '/alumni/messages',
		},
		{
			label: 'Job Board',
			to: '/alumni/jobs',
		},
	];
</script>

<template>
	<div class="sticky top-0 z-50 bg-zuccini shadow-lg dark:bg-[#111827]">
		<div class="max-w-screen-xl mx-auto px-4">
			<div class="h-16 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<UButton
						icon="i-heroicons-bars-3"
						class="md:hidden text-white hover:text-black"
						variant="ghost"
						color="white"
						@click="
							slideover.open(AlumniSlideOver, { onClose: slideover.close })
						" />
					<NuxtImg
						src="/cpsu-logo.png"
						width="36"
						height="36"
						preload />
					<NuxtLink
						to="/alumni"
						class="text-lg font-bold text-white"
						>CPSU</NuxtLink
					>
				</div>
				<div class="flex items-center gap-2">
					<UHorizontalNavigation
						:links="navLinks"
						:ui="{ wrapper: 'hidden md:flex' }">
						<template #default="{ link }">
							<span class="group-hover:text-yellow-500 relative">{{
								link.label
							}}</span>
						</template>
					</UHorizontalNavigation>
					<UButton
						label="Sign out"
						variant="solid"
						color="yellow"
						class="text-black"
						@click="signOut(auth as Auth)"
						size="xs" />
				</div>
			</div>
		</div>
	</div>
</template>
