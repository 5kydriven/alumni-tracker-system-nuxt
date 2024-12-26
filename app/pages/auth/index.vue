<script setup lang="ts">
definePageMeta({
  middleware: (_to) => {
    const store = useAuthStore();
    if (store.userCredential !== null) {
      return navigateTo("/");
    }
  },
});
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <AuthForm />
  </section>
</template>
