<script setup lang="ts">
import { signOut } from "firebase/auth";

const auth = useFirebaseAuth();

const links = ref([
	{
		label: "Dashboard",
		to: "/admin",
		click: () => emits('close')
	},
	{
		label: "User",
		to: "/admin/user-list",
		click: () => emits('close')
	},
]);

const emits = defineEmits<{
	close: []
}>()
</script>

<template>
	<USlideover side="left">
		<div class="p-4 flex items-center justify-between border-b dark:border-gray-800">
			<div>CPSU</div>
			<UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square padded
				@click="emits('close')" />
		</div>
		<div class="flex flex-col py-4 px-2 justify-between h-full">
			<UVerticalNavigation :links="links">
				<template #default="{ link }">
					<span class="group-hover:text-primary relative">{{
						link.label
					}}</span>
				</template>
			</UVerticalNavigation>

			<UButton @click="signOut(auth)" label="Sign out" icon="i-heroicons-arrow-left-end-on-rectangle" variant="solid"
				class="w-full" color="white" />
		</div>
	</USlideover>
</template>