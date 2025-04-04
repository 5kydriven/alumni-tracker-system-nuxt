<script setup lang="ts">
	import { EmployerAlumniResume } from '#components';

	const router = useRouter();
	const name = ref();
	const modal = useModal();
	const route = useRoute();

	const props = defineProps<{
		participantName?: string;
		uid?: string;
		isLoading?: boolean;
	}>();

	watchEffect(() => (name.value = props.participantName));
</script>

<template>
	<div
		class="h-16 p-4 flex items-center gap-2 w-full shrink-0 bg-white shadow border-b border-gray-300">
		<UButton
			icon="i-heroicons-chevron-left"
			color="white"
			variant="ghost"
			class="md:hidden"
			@click="router.back()" />
		<UAvatar
			v-if="!props.isLoading"
			:alt="
				!props.participantName
					? 'Deleted Account'
					: props.participantName.toUpperCase()
			" />
		<USkeleton
			class="h-8 w-8"
			:ui="{ rounded: 'rounded-full' }"
			v-else />
		<USkeleton
			class="h-6 w-[250px]"
			v-if="props.isLoading" />
		<div
			v-else
			class="flex justify-between w-full items-center">
			<label class="text-black text-lg font-bold capitalize">
				{{ !props.participantName ? 'Deleted Account' : props.participantName }}
			</label>
			<UButton
				v-show="route.path.includes('employer') && props.participantName"
				@click="
					modal.open(EmployerAlumniResume, {
						uid: props.uid,
						onClose: modal.close,
					})
				"
				variant="soft"
				label="View Resume" />
		</div>
	</div>
</template>
