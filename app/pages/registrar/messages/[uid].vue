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
		<div class="w-full border-gray-200 border-r hidden md:flex flex-col flex-1">
			<div class="h-16 px-4 flex items-center 0 bg-gray-300 shrink-0">
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
		<RegistrarMessage class="flex-auto" />
	</div>
</template>
