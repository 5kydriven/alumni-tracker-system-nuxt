<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <main>

    <EmployerNavbar v-if="route.path.startsWith('/employer')" />
    <AlumniNavbar v-if="route.path.startsWith('/alumni')" />


    <div class="xl:max-w-screen-xl xl:mx-auto xl:p-4 h-[calc(100vh-65px)] overflow-auto">
      <slot />
    </div>

  </main>
</template>