<script setup lang="ts">
	const router = useRouter();
</script>

<template>
	<div class="h-full w-full py-16 bg-gray-100">
		<div class="max-w-screen-md mx-auto flex flex-col gap-2 px-4">
			<div
				@click="router.push('/auth')"
				class="hover:underline">
				< Back
			</div>
			<AuthSignupForm @success="router.replace('/auth/finish')" />
		</div>
	</div>
</template>
