<script setup lang="ts">
definePageMeta({
  middleware: ["01-role"],
});
</script>
<template>
  <div class="w-full h-screen">
    <BuildingMessage />
  </div>
</template>
