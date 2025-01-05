<script setup lang="ts">
import { SlideOverAlumni } from '#components'
import { signOut } from 'firebase/auth'

const auth = useFirebaseAuth()
const slideover = useSlideover()

const navLinks = [{
  label: 'Home',
  to: '/alumni'
}, {
  label: 'Messages',
  to: '/alumni/messages'
}, {
  label: 'Job Board',
  to: '/alumni/jobs'
},]

const colorMode = useColorMode()
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

  <div class="border-b dark:border-gray-800 sticky top-0 z-50 border-gray-200 dark:bg-[#111827]">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class=" h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UButton icon="i-heroicons-bars-3" class="lg:hidden" variant="ghost" color="gray"
            @click="slideover.open(SlideOverAlumni, { onClose: slideover.close })" />
          <NuxtLink to="/alumni">CPSU</NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray"
            variant="ghost" @click="isDark = !isDark" />
          <UHorizontalNavigation :links="navLinks" :ui="{ wrapper: 'justify-end hidden lg:flex' }" />
          <UButton label="Sign out" variant="solid" color="white" @click="signOut(auth)" size="xs" />
        </div>
      </div>
    </div>
  </div>


</template>
