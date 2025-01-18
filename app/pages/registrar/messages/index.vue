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
			class="border-gray-200 border-r drop-shadow-sm flex flex-col md:max-w-sm w-full flex-none">
			<ConversationHeader
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				isShowButton />
			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<MessageDefault />
	</div>
</template>
