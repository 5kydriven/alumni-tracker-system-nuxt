<script setup lang="ts">

const links = [{
  label: 'Home',
  to: '/employer',
  click: () => emits('close')
}, {
  label: 'Messages',
  to: '/employer/messages',
  click: () => emits('close')
}
  // {
  //   label: 'Post Job',
  //   to: '/employer/post-job',
  //   click: () => emits('close')
  // }
]

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <USlideover side="left">
    <div class="p-4 flex items-center justify-between border-b dark:border-gray-800">
      <div>CPSU</div>
      <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square padded
        @click="emits('close')" />
    </div>
    <UVerticalNavigation :links="links" class="py-4 px-2">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UVerticalNavigation>
  </USlideover>
</template>