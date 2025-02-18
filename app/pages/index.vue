<script setup lang="ts">
	definePageMeta({
		middleware: ['01-role'],
	});
</script>
<template>
	<div class="w-full h-screen flex justify-center items-center">
		<UIcon
			name="i-heroicons-arrow-path"
			class="w-28 h-28 text-gray-700 animate-spin" />
	</div>
</template>
