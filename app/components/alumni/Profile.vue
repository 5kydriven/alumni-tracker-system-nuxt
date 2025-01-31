<script setup lang="ts">
	const props = defineProps<{
		name?: Alumni['name'];
		province?: Alumni['province'];
		city?: Alumni['city'];
	}>();
</script>

<template>
	<div
		class="border pb-4 rounded-lg border-gray-200 shadow-lg dark:border-gray-800 bg-white">
		<div class="relative">
			<div class="h-32 md:h-52 bg-primary-700 w-full relative z-0 rounded-t">
				<UAvatar
					:alt="props.name"
					size="3xl"
					class="md:w-28 md:h-28 text-large absolute bottom-[-3rem] left-6 rounded-full" />
			</div>
		</div>
		<div class="mt-12 flex flex-col gap-2">
			<div class="px-8 pb-0">
				<div class="flex flex-col">
					<label class="lg:text-2xl font-bold text-lg">{{ props.name }}</label>
					<span class="text-gray-400 text-sm"
						>{{ props.city }}, {{ props.province }}</span
					>
				</div>
			</div>
			<div class="px-8 flex flex-col">
				<span class="font-semibold">About Me</span>
				<p class="text-gray-400 text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
					laboriosam iste tempora exercitationem, ab officia placeat
					consequuntur. Accusamus, consectetur sunt. Ea illo velit voluptatum
					numquam eveniet beatae ex, totam perspiciatis.
				</p>
			</div>
		</div>
	</div>
</template>
