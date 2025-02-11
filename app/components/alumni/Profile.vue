<script setup lang="ts">
	import { AlumniAddDescription } from '#components';

	const modal = useModal();

	const props = defineProps<{
		uid?: User['uid'];
		name?: User['name'];
		userCredentials?: {
			city?: AlumniCredentials['city'];
			province?: AlumniCredentials['province'];
			description?: AlumniCredentials['description'];
		};
	}>();
</script>

<template>
	<div
		class="border pb-4 rounded-lg border-gray-200 shadow-lg dark:border-gray-800 bg-white">
		<div class="relative">
			<div class="h-32 md:h-52 bg-primary-700 w-full relative z-0 rounded-t">
				<UAvatar
					:alt="props.name?.toUpperCase()"
					size="3xl"
					class="md:w-28 md:h-28 text-large absolute bottom-[-3rem] left-6 rounded-full" />
			</div>
		</div>
		<div class="mt-12 flex flex-col gap-4">
			<div class="px-8 pb-0">
				<div class="flex flex-col">
					<label class="lg:text-2xl font-bold text-lg capitalize">{{
						props.name
					}}</label>
					<span class="text-gray-400 text-sm"
						>{{ props.userCredentials?.city }},
						{{ props.userCredentials?.province }}</span
					>
				</div>
			</div>
			<div class="px-8 flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<span class="font-semibold">About Me</span>
					<UButton
						v-show="props.userCredentials?.description"
						icon="i-heroicons-pencil-square-solid"
						size="2xs"
						@click="
							modal.open(AlumniAddDescription, {
								onClose: modal.close,
								uid: props.uid,
								description: props.userCredentials?.description,
							})
						" />
				</div>
				<p
					class="text-gray-400 text-sm"
					v-if="props.userCredentials?.description">
					{{ props.userCredentials?.description }}
				</p>
				<div
					class="w-full flex justify-center items-center p-8"
					v-else>
					<UButton
						icon="i-heroicons-pencil-square-solid"
						label="description"
						size="sm"
						variant="soft"
						@click="
							modal.open(AlumniAddDescription, {
								onClose: modal.close,
								uid: props.uid,
							})
						" />
				</div>
			</div>
		</div>
	</div>
</template>
