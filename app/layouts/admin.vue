<script setup>
import { signOut } from "firebase/auth";
import { ref } from "vue";
const auth = useFirebaseAuth();
const links = ref([
  {
    label: "Dashboard",
    to: "/admin",
  },
  {
    label: "User",
    to: "/admin/user-list",
  },
]);
</script>

<template>
  <div class="w-full flex h-full">
    <aside class="hidden w-[250px] flex-col md:flex border-r dark:border-gray-800 h-screen px-4">
      <div class="h-16 flex items-center">CPSU</div>
      <UVerticalNavigation :links="links" class="grow">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            link.label
          }}</span>
        </template>
      </UVerticalNavigation>
      <div class="py-4">
        <UButton @click="signOut(auth)" label="Sign out" icon="i-heroicons-arrow-left-end-on-rectangle" variant="solid"
          class="w-full" color="white" />
      </div>
    </aside>
    <div class="flex flex-col w-full">
      <slot />
    </div>
  </div>
</template>
