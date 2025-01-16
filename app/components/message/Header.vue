<script setup lang="ts">
	const router = useRouter();

	const props = defineProps<{
		participantName?: string;
	}>();
</script>

<template>
	<div class="h-16 p-4 flex items-center gap-2 w-full shrink-0">
		<UButton
			icon="i-heroicons-chevron-left"
			color="white"
			variant="ghost"
			class="md:hidden"
			@click="router.back()"
		/>
		<UAvatar :alt="props.participantName" />
		<label class="text-black text-lg font-bold">
			{{ props.participantName }}
		</label>
	</div>
</template>
