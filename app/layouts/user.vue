<script setup lang="ts">
	const route = useRoute();
	console.log(route.path.startsWith('/employer'));
</script>

<template>
	<main>
		<EmployerNavbar v-show="route.path.startsWith('/employer')" />
		<AlumniNavbar v-show="route.path.startsWith('/alumni')" />
		<div class="h-[calc(100vh-65px)] overflow-auto bg-gray-100">
			<slot />
		</div>
	</main>
</template>
