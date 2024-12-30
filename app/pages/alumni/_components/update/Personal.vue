<script setup lang="ts">
const { form } = storeToRefs(useStepperStore())
</script>

<template>
  <div class="border dark:border-gray-700 rounded p-4 dark:bg-gray-800">
    <h1 class="text-lg font-bold">Personal Details</h1>
    <UDivider class="my-2" :ui="{ border: { base: 'dark:border-gray-500' } }" />
    <div class="flex flex-col gap-2">
      <div class="flex gap-2 items-center">
        <!-- <UAvatar size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar"
          :ui="{ rounded: 'rounded' }" /> -->
        <div class="flex flex-col gap-2 w-full">
          <UFormGroup label="Full Name" required>
            <UInput placeholder="you@example.com" v-model="form.name" />
          </UFormGroup>
          <!-- <UFormGroup label="Last Name" required>
            <UInput placeholder="you@example.com" />
          </UFormGroup> -->
        </div>
      </div>
      <div class="grid grid-cols-12 gap-2">
        <UFormGroup label="Phone number" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.phoneNumber" />
        </UFormGroup>
        <UFormGroup label="Province" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.address.province" />
        </UFormGroup>
        <UFormGroup label="Zip Code" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.address.zipCode" />
        </UFormGroup>
        <UFormGroup label="City" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.address.city" />
        </UFormGroup>
        <UFormGroup label="Date of birth" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.birthDate" />
        </UFormGroup>
        <UFormGroup label="Place of birth" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.birthPlace" />
        </UFormGroup>
        <UFormGroup label="Gender" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.gender" />
        </UFormGroup>
        <UFormGroup label="Marital status" class="col-span-6" required>
          <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="form.maritalStatus" />
        </UFormGroup>
      </div>
    </div>
  </div>
</template>