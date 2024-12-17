<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <main>
    <EmployerNavbar v-show="route.path.startsWith('/employer')" />
    <AlumniNavbar v-show="route.path.startsWith('/alumni')" />
    <div class="s overflow-auto">
      <div class="xl:max-w-screen-xl xl:mx-auto xl:p-4 h-[calc(100vh-65px)]">
        <slot />
      </div>
    </div>
  </main>
</template>