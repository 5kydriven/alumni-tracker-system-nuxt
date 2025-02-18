<script setup lang="ts">
	import { RegistrarMessageAdd } from '#components';

	const modal = useModal();

	const emits = defineEmits<{
		click: [];
	}>();
	const props = defineProps({
		isShowButton: {
			default: false,
			type: Boolean,
			required: false,
		},
	});
</script>

<template>
	<div class="h-16 px-4 flex items-center bg-gray-300 w-full">
		<div class="flex justify-between items-center w-full">
			<div class="flex gap-2 items-center">
				<UButton
					@click="emits('click')"
					class="lg:hidden"
					icon="i-heroicons-bars-3"
					variant="ghost"
					color="white"
					size="sm" />
				<label class="text-lg font-bold text-gray-900">Chats</label>
			</div>
			<UButton
				color="yellow"
				icon="i-heroicons-pencil-square-solid"
				:class="!props.isShowButton ? 'hidden' : 'text-black'"
				label="New chat"
				@click="modal.open(RegistrarMessageAdd, { onClose: modal.close })" />
		</div>
	</div>
</template>
