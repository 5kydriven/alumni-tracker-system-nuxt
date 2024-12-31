<script setup lang="ts">
useHead({
  title: "CPSU | Welcome",
});
// const router = useRouter();
// const user = useCurrentUser();

// onBeforeMount(() => {
//   if (user) {
//     return router.replace("/");
//   }
// });
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <AuthForm />
  </section>
</template>
