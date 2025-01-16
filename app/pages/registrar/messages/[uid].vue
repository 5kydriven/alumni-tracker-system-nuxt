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
			class="w-full border-gray-200 border-r hidden md:flex flex-col md:max-w-sm flex-none"
		>
			<ConversationHeader
				@click="
					slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })
				"
				isShowButton
			/>
			<ConversationContainer @itemClicked="handleClick" />
		</div>
		<MessageContainer />
	</div>
</template>
