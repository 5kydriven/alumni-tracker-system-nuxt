<script setup lang="ts">
	const user = useCurrentUser();
</script>

<template>
	<h1 class="text-xl font-bold">Hello, {{ user?.displayName }}</h1>
</template>
