<script setup lang="ts">
	const navLinks = [
		{
			label: 'Home',
		},
		{
			label: 'About',
		},
		{
			label: 'News',
		},
		{
			label: 'Contact',
		},
	];

	const items = [
		'https://picsum.photos/1920/1080?random=1',
		'https://picsum.photos/1920/1080?random=2',
		'https://picsum.photos/1920/1080?random=3',
		'https://picsum.photos/1920/1080?random=4',
		'https://picsum.photos/1920/1080?random=5',
		'https://picsum.photos/1920/1080?random=6',
	];

	const carouselRef = ref();

	onMounted(() => {
		setInterval(() => {
			if (!carouselRef.value) return;

			if (carouselRef.value.page === carouselRef.value.pages) {
				return carouselRef.value.select(0);
			}

			carouselRef.value.next();
		}, 3000);
	});
</script>

<template>
	<main class="h-screen overflow-auto relative">
		<Navbar
			class="bg-zuccini-500 !justify-center !h-auto !py-4 sticky top-0 z-10">
			<div class="max-w-screen-xl w-full flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-4">
						<NuxtImg
							src="/cpsu-logo.png"
							width="50"
							height="50"
							preload />
						<NuxtLink
							to="/alumni"
							class="text-lg text-white font-serif font-thin"
							>CENTRAL PHILIPPINES STATE UNIVERSITY</NuxtLink
						>
					</div>
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
						label="Login"
						variant="solid"
						color="yellow"
						class="text-black"
						size="xs" />
				</div>
			</div>
		</Navbar>
		<UCarousel
			ref="carouselRef"
			v-slot="{ item }"
			:items="items"
			:ui="{ item: 'basis-full' }"
			class="overflow-hidden h-[calc(100vh-82px)]">
			<img
				:src="item"
				class="w-full"
				draggable="false" />
		</UCarousel>
		<Container class="flex flex-col gap-4 py-4 text-center">
			<label class="text-3xl font-bold">Lates News</label>
			<div class="flex justify-between">
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
			</div>
		</Container>
		<Container class="flex flex-col gap-4 py-4 text-center">
			<label class="text-3xl font-bold">Upcoming Events</label>
			<div class="flex justify-between">
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
				<UCard>
					<template #header>
						<div class="h-8"></div>
					</template>

					<div class="h-32 w-64"></div>

					<template #footer>
						<div class="h-8"></div>
					</template>
				</UCard>
			</div>
		</Container>
		<footer class="py-4 text-center border-t">5KYDRIVEN</footer>
	</main>
</template>
