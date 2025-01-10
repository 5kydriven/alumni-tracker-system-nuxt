<script setup lang="ts">
	const route = useRoute();
	console.log(route.path.startsWith('/employer'));
</script>

<template>
	<main>
		<EmployerNavbar v-show="route.path.startsWith('/employer')" />
		<AlumniNavbar v-show="route.path.startsWith('/alumni')" />
		<div
			class="xl:max-w-screen-xl xl:mx-auto xl:p-4 h-[calc(100vh-65px)] overflow-auto"
		>
			<slot />
		</div>
	</main>
</template>
