<script setup lang="ts">
import { signOut } from "firebase/auth";

const auth = useFirebaseAuth();

const links = ref([
	{
		label: "Dashboard",
		to: "/registrar",
		click: () => emits('close')
	},
	{
		label: "Alumni",
		to: "/registrar/alumni-list",
		click: () => emits('close')
	},
]);

function handleSignOut() {
	emits('close')
	signOut(auth)
}

const emits = defineEmits<{
	close: []
}>()
</script>

<template>
	<USlideover side="left" :ui="{background: 'bg-zuccini-500'}">
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

			<UButton @click="handleSignOut" label="Sign out" icon="i-heroicons-arrow-left-end-on-rectangle" variant="solid"
				class="w-full" color="yellow" />
		</div>
	</USlideover>
</template>
