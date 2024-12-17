<script setup lang="ts">
  import { breakpointsTailwind } from '@vueuse/core';
  import InboxMessage from './Message.vue';

  const slideOver = useSlideover()

  interface User {
    name: String,
    date: String,
    message: String
  }

  interface Data {
    data?: User[]
  }

  const prop = defineProps<Data>()

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isLaptop = breakpoints.greaterOrEqual('lg')
</script>

<template>
  <div class="border-r-none border-gray-200 lg:border-r dark:border-gray-800 lg:max-w-md flex flex-col">
    <div class="h-16 px-4 lg:flex items-center hidden shrink-0">
      <div class="flex gap-2 items-center">
        <label>Messages</label>
        <UBadge label="20" variant="subtle" />
      </div>
    </div>

    <div
      class="flex flex-col border-t-none h-full border-gray-200 overflow-auto lg:border-t dark:border-gray-800 xl:h-[calc(100vh-73px)]">
      <div v-for="n in prop.data" v-if="!isLaptop" class="p-4 border-b dark:border-gray-800 cursor-pointer"
        @click="slideOver.open(InboxMessage)">
        <div class="flex justify-between" :class="false ? 'text-gray-900 font-semibold' : 'text-gray-600'">
          <label>{{ n.name }}</label>
          <span>{{ n.date }}</span>
        </div>
        <p class="dark:text-gray-500 text-gray-500 line-clamp-1">{{ n.message }}</p>
      </div>

      <div v-for="n in prop.data" class="p-4 border-b dark:border-gray-800 cursor-pointer" v-else>
        <div class="flex justify-between" :class="false ? 'text-gray-900 font-semibold' : 'text-gray-600'">
          <label>{{ n.name }}</label>
          <span>{{ n.date }}</span>
        </div>
        <p class="dark:text-gray-500 text-gray-500 line-clamp-1">{{ n.message }}</p>
      </div>
    </div>
  </div>
</template>