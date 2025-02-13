<script setup lang="ts">
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const navbarType = computed(() => {
		if (route.path.startsWith('/employer')) return 'employer';
		if (route.path.startsWith('/alumni')) return 'alumni';
		return null;
	});
</script>

<template>
	<main>
		<EmployerNavbar v-if="navbarType === 'employer'" />
		<AlumniNavbar v-if="navbarType === 'alumni'" />
		<div class="h-[calc(100vh-65px)] overflow-auto bg-gray-100">
			<slot />
		</div>
	</main>
</template>
