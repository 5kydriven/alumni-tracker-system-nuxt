<script setup lang="ts">
const props = defineProps<{
	name?: Alumni['name']
	province?: Alumni['province']
	city?: Alumni['city']
}>()

</script>

<template>
	<div class="border pb-4 rounded border-gray-200 dark:border-gray-800">
		<div class="relative">
			<div class="h-52 bg-primary-700 w-full relative z-0 rounded-t">
				<UAvatar alt="M" size="3xl" class="w-32 h-32 text-large absolute bottom-[-3rem] left-6 rounded-full" />
			</div>
			<div class="mt-12 px-8 pb-0">
				<div class="flex flex-col">
					<label class="text-2xl font-bold">{{ props.name }}</label>
					<span class="text-gray-400">{{ props.city }}, {{ props.province }}</span>
				</div>
			</div>
		</div>
		<div class="px-8 flex flex-col">
			<span>About Me</span>
			<p class="text-gray-400 text-sm xl:text-base">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
				laboriosam iste tempora exercitationem, ab officia placeat
				consequuntur. Accusamus, consectetur sunt. Ea illo velit voluptatum
				numquam eveniet beatae ex, totam perspiciatis.
			</p>
		</div>
	</div>
</template>