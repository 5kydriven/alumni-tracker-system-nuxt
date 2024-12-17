<script setup lang="ts">
  const slideover = useSlideover()

  const links = [{
    label: 'Home',
    to: '/employer',
    click: () => slideover.close()
  }, {
    label: 'Messages',
    to: '/employer/messages',
    click: () => slideover.close()
  }, {
    label: 'Post Job',
    to: '/employer/post-job',
    click: () => slideover.close()
  }]
</script>

<template>
  <USlideover side="left">
    <div class="p-4 flex items-center justify-between border-b dark:border-gray-800">
      <div>CPSU</div>
      <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square padded
        @click="slideover.close()" />
    </div>
    <UVerticalNavigation :links="links" class="py-4 px-2">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UVerticalNavigation>
  </USlideover>
</template>