<script setup lang="ts">
import { SlideOverEmployer } from '#components';
const slideover = useSlideover();

const navLinks = [{
  label: 'Home',
  to: '/employer'
}, {
  label: 'Messages',
  to: '/employer/messages'
}, {
  label: 'Post Job',
  to: '/employer/post-job'
}]

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>

<template>
  <div class="border-b dark:border-gray-800 sticky border-gray-200 top-0 z-50 dark:bg-[#111827]">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class=" h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UButton icon="i-heroicons-bars-3" class="md:hidden" variant="ghost" color="gray"
            @click="slideover.open(SlideOverEmployer, { onClose: slideover.close })" />
          <NuxtLink to="/employer">CPSU</NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray"
            variant="ghost" @click="isDark = !isDark" />
          <UHorizontalNavigation :links="navLinks" :ui="{ wrapper: 'justify-end' }" class="hidden md:flex">
            <template #default="{ link }">
              <span class="group-hover:text-primary ">{{ link.label }}</span>
            </template>
          </UHorizontalNavigation>
        </div>
      </div>
    </div>
  </div>
</template>
