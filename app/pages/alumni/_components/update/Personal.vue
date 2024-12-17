<template>
  <div class="border dark:border-gray-700 rounded p-4 dark:bg-gray-800">
    <h1 class="text-lg font-bold">Personal Details</h1>
    <UDivider class="my-2" :ui="{ border: { base: 'dark:border-gray-500' } }" />
    <div class="flex gap-2 items-center p-2">
      <UAvatar size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar"
        :ui="{ rounded: 'rounded' }" />
      <div class="flex flex-col w-full">
        <UFormGroup label="First Name" required>
          <UInput placeholder="you@example.com" />
        </UFormGroup>
        <UFormGroup label="Last Name" required>
          <UInput placeholder="you@example.com" />
        </UFormGroup>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2">
      <UFormGroup label="Email address" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Phone number" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Address" class="col-span-12">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Zip Code" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="City/Town" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Date of birth" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Place of birth" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Gender" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      <UFormGroup label="Marital status" class="col-span-6">
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
    </div>
  </div>
</template>