<script setup lang="ts">
  const modal = useModal()


</script>

<template>
  <UModal>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Import Alumni's
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="modal.close()" />
        </div>
      </template>

      <div>
        <UFormGroup label="Add your csv file">
          <UInput type="file" size="sm" icon="i-heroicons-folder" />
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="solid" label="Cancel" />
          <UButton variant="solid" label="Upload" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>