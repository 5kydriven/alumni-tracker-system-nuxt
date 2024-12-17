<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <AuthForm />
  </section>
</template>
