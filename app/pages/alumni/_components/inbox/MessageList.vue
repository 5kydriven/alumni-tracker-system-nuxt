<script setup lang="ts">
  import { breakpointsTailwind } from '@vueuse/core';
  import InboxMessage from './Message.vue';

  const slideOver = useSlideover()
  const store = useChatStore()

  interface User {
    name: String,
    date: String,
    message: String
  }

  interface Data {
    data?: User[]
  }

  // const prop = defineProps<Data>()
  const router = useRouter()

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isLaptop = breakpoints.greaterOrEqual('lg')

  function handleClick(uid: string) {
    // if (!isLaptop.value) {
    //   slideOver.open(InboxMessage, { onClose: slideOver.close })
    // }
    router.push(`/alumni/messages/${uid}`)
  }
</script>

<template>
  <div class="border-r-none w-full border-gray-200 lg:border-r dark:border-gray-800 lg:max-w-md flex flex-col">
    <div class="h-16 px-4 lg:flex items-center hidden shrink-0">
      <div class="flex gap-2 items-center">
        <label>Messages</label>
        <UBadge label="20" variant="subtle" />
      </div>
    </div>

    <div
      class="flex flex-col border-t-none h-full border-gray-200 overflow-auto lg:border-t dark:border-gray-800 xl:h-[calc(100vh-73px)]">
      <div v-for="chat in store.chats" class="p-4 border-b dark:border-gray-800 cursor-pointer"
        @click="handleClick(chat.uid)">
        <div class="flex justify-between" :class="false ? 'text-gray-900 font-semibold' : 'text-gray-600'">
          <label class="capitalize">{{ chat.name }}</label>
          <span>{{ chat.date }}</span>
        </div>
        <p class="dark:text-gray-500 text-gray-500 line-clamp-1">{{ chat.message }}</p>
      </div>

    </div>
  </div>
</template>