<script setup lang="ts">
  definePageMeta({
    layout: 'user'
  })

  const state = reactive({
    email: undefined,
    password: undefined
  })
</script>

<template>
  <div class="mx-auto  max-w-screen-lg p-4 ">
    <div class="border border-gray-200 dark:border-gray-800 p-4 rounded">
      <h1>Job Details</h1>
      <UForm :state="state" class="space-y-4">
        <div class="grid grid-cols-12 gap-4">
          <UFormGroup label="Job Title" class="col-span-6" name="title">
            <UInput type="text" />
          </UFormGroup>

          <UFormGroup label="Workplace Type" class="col-span-6" name="password">
            <UInput type="password" />
          </UFormGroup>

          <UFormGroup label="Workplace Type" class="col-span-6" name="password">
            <UInput type="password" />
          </UFormGroup>

          <UFormGroup label="Workplace Type" class="col-span-6" name="password">
            <UInput type="password" />
          </UFormGroup>

          <UFormGroup label="Email" class="col-span-12">
            <UTextarea color="white" variant="outline" placeholder="Search..." size="xl" />
          </UFormGroup>
        </div>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>