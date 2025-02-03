<script setup lang="ts">
	const router = useRouter();
</script>

<template>
	<main class="w-full h-screen flex flex-col justify-center items-center p-4">
		<div
			class="max-w-xl flex flex-col justify-center items-center gap-8 border-2 border-primary-500 rounded-lg p-4 md:p-8">
			<div class="flex flex-col gap-2">
				<label class="md:text-3xl font-bold text-center"
					>Thank you for your submission!</label
				>
				<span class="text-xs md:text-base text-center">
					We’ll review it and notify you via email if accepted.
				</span>
			</div>
			<UButton
				block
				@click="() => router.replace('/auth')"
				>Go To Home</UButton
			>
		</div>
	</main>
</template>
