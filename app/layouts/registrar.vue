<script setup>
  import { ref } from 'vue';

  const links = ref([
    {
      label: 'Dashboard',
      to: '/registrar',
    },
    {
      label: 'Alumni',
      to: '/registrar/alumni-list',
    },
    // {
    //   label: 'User',
    //   to: '/admin/user-list',
    // },
  ]);
</script>

<template>
  <div class="w-full flex h-full">
    <aside class="w-[250px] flex-col hidden lg:flex border-r dark:border-gray-800 h-screen px-4">
      <div class="h-16 flex items-center">
        CPSU
      </div>
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </aside>
    <div class="flex flex-col w-full">
      <slot />
    </div>
  </div>
</template>
