<script setup lang="ts">
const store = useStepperStore()

</script>

<template>
  <div class="border dark:border-gray-700 rounded p-4 dark:bg-gray-800">
    <h1 class="text-lg font-bold">Account Details</h1>
    <UDivider class="my-2" :ui="{ border: { base: 'dark:border-gray-500' } }" />

    <div class="flex flex-col gap-2">
      <UFormGroup label="Email" required>
        <UInput placeholder="you@example.com" type="email" v-model="store.form.email" />
      </UFormGroup>
      <UFormGroup label="Password" required>
        <UInput placeholder="••••••••" type="password" v-model="store.form.password" />
      </UFormGroup>
      <!-- <UFormGroup label="Confirm Password">
        <UInput placeholder="••••••••" type="password" />
      </UFormGroup> -->
    </div>
  </div>
</template>