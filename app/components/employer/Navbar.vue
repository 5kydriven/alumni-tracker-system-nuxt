<script setup lang="ts">
	import { EmployerSlideOver } from '#components';
	import { signOut, type Auth } from 'firebase/auth';

	const auth = useFirebaseAuth();
	const slideover = useSlideover();

	const navLinks = [
		{
			label: 'Home',
			to: '/employer',
		},
		{
			label: 'Messages',
			to: '/employer/messages',
		},
		// {
		//   label: 'Post Job',
		//   to: '/employer/post-job'
		// }
	];
</script>

<template>
	<div
		class="dark:border-gray-800 sticky bg-zuccini top-0 z-50 dark:bg-[#111827]">
		<div class="max-w-screen-xl mx-auto px-4">
			<div class="h-16 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<UButton
						icon="i-heroicons-bars-3"
						class="md:hidden text-white hover:text-black"
						variant="ghost"
						color="gray"
						@click="
							slideover.open(EmployerSlideOver, { onClose: slideover.close })
						" />
					<NuxtImg
						src="/cpsu-logo.png"
						width="36"
						height="36" />
					<NuxtLink
						to="/employer"
						class="text-lg font-bold text-white"
						>CPSU</NuxtLink
					>
				</div>
				<div class="flex items-center gap-2">
					<!-- <UButton
						:icon="
							isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
						"
						color="gray"
						variant="ghost"
						@click="isDark = !isDark"
					/> -->
					<UHorizontalNavigation
						:links="navLinks"
						:ui="{ wrapper: 'justify-end' }"
						class="hidden md:flex">
						<template #default="{ link }">
							<span class="group-hover:text-yellow-500 relative">{{
								link.label
							}}</span>
						</template>
					</UHorizontalNavigation>
					<UButton
						label="Sign out"
						color="yellow"
						@click="signOut(auth as Auth)"
						size="xs" />
				</div>
			</div>
		</div>
	</div>
</template>
