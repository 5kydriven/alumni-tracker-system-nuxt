<script setup lang="ts">
	import { RegistrarSlideOver } from '#components';

	definePageMeta({
		layout: 'registrar',
	});

	const router = useRouter();
	const slideOver = useSlideover();

	function handleClick(uid: string) {
		router.push(`/registrar/messages/${uid}`);
	}
</script>

<template>
	<div class="flex h-full">
		<div
			class="border-gray-200 border-r drop-shadow-sm flex flex-col md:max-w-sm w-full flex-none"
		>
			<div class="h-16 px-4 flex items-center bg-gray-300 w-full">
				<div class="flex gap-2 items-center">
					<UButton
						@click="
							slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
						"
						class="lg:hidden"
						icon="i-heroicons-bars-3"
						variant="ghost"
						color="white"
						size="sm"
					/>
					<label class="text-lg font-bold text-gray-900">Messages</label>
				</div>
			</div>
			<RegistrarConversationItem @itemClicked="handleClick" />
		</div>
		<RegistrarDefaultMessage />
	</div>
</template>
