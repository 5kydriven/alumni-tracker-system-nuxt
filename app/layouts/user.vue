<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <main>

    <EmployerNavbar v-if="route.path == '/employer'" />
    <AlumniNavbar v-if="route.path == '/alumni'" />

    <div class="overflow-auto">
      <div class="xl:max-w-screen-xl xl:mx-auto xl:p-4 h-[calc(100vh-65px)]">
        <slot />
      </div>
    </div>
  </main>
</template>