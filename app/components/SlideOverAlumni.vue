<script setup lang="ts">
  const slideover = useSlideover()

  const links = [{
    label: 'Home',
    to: '/alumni',
    click: () => slideover.close()
  }, {
    label: 'Messages',
    to: '/alumni/messages',
    click: () => slideover.close()
  }, {
    label: 'Job Board',
    to: '/alumni/job-list',
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