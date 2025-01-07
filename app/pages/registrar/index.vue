<script setup lang="ts">
import { RegistrarSlideOver } from '#components';

definePageMeta({
  layout: "registrar",
});

const slideOver = useSlideover()
</script>

<template>
  <Navbar>
    <div class="flex gap-2 items-center">
      <UButton @click="slideOver.open(RegistrarSlideOver, { onClose: slideOver.close })" class="md:hidden"
        icon="i-heroicons-bars-3" variant="ghost" color="white" size="sm" />
      <label>Home</label>
    </div>
  </Navbar>
  <div>Registrar</div>
</template>