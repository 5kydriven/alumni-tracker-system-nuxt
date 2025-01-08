<script setup lang="ts">
  import { breakpointsTailwind } from "@vueuse/core";

  const store = useChatStore()

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isLaptop = breakpoints.greaterOrEqual("lg");

  const currentUid = ref('1')
  // const messages = ref(Array.from({ length: 30 }, (_, i) => i + 1));
  const message = ref('')
  function handleSubmit() {
    store.storeMessage({ content: message.value, uid: currentUid.value })
    message.value = ''
  }

  const emits = defineEmits<{
    close: []
  }>()
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="h-16 p-4 flex items-center gap-2 w-full shrink-0">
      <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
      <label>John Doe</label>
    </div>

    <!-- message section -->
    <div
      class="border-y border-gray-200 dark:border-gray-800 dark:text-gray-200 overflow-auto flex flex-col justify-end flex-1">
      <div class="flex flex-col gap-2 overflow-auto h-auto px-4 py-2">
        <div v-for="(m, i) in store.messages" :key="i" class="flex flex-col gap-1 h-14"
          :class="currentUid == m.uid ? 'self-end' : 'self-start'">
          <div class="flex" :class="currentUid == m.uid ? 'justify-end' : 'gap-2'">
            <UAvatar alt="test" :class="currentUid == m.uid ? 'hidden' : ''" />
            <p :class="currentUid == m.uid ? 'bg-gray-400 dark:bg-primary-800 rounded-tr-none  rounded-lg'
              : 'bg-primary-400 dark:bg-gray-800  rounded-tl-none rounded-lg'
              " class="px-2 py-1 text-wrap">
              {{ m.content }}
            </p>
          </div>
          <span :class="currentUid == m.uid ? 'self-start' : 'self-end'" class="text-xs text-gray-500">07:4{{ i }}
            AM</span>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="flex gap-2 p-4">
      <UInput placeholder="Type a message" v-model="message" class="w-full" required />
      <UButton label="send" icon="i-heroicons-paper-airplane" type="submit" />
    </form>
  </div>



  <!-- <template v-if="false">
    <USlideover>

      <div class="h-16 px-4 flex items-center gap-2 w-full shrink-0">
        <UIcon name="i-heroicons-chevron-left" @click="emits('close')" class="lg:hidden cursor-pointer" />
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        <label>John Doe</label>
      </div>

      <div
        class="grid h-full grid-cols-12 gap-4 px-4 py-2 border-y border-gray-200 dark:border-gray-800 overflow-auto dark:text-gray-200">
        <div v-for="(m, i) in store.messages" :key="i" :class="i % 2 == 0 ? 'col-span-8' : 'col-start-4 col-end-13'"
          class="flex flex-col gap-1">
          <p :class="i % 2 == 0
            ? 'bg-gray-400 dark:bg-gray-800 rounded-tl-none rounded-lg'
            : 'bg-primary-400 dark:bg-primary-800 rounded-tr-none rounded-lg'
            " class="px-2 py-1 text-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            quaerat illum quas iste voluptatum veniam ipsum esse. Omnis
            praesentium voluptatibus incidunt voluptates fugit quasi enim ea,
            dolorem numquam tempore tempora.
          </p>
          <span :class="i % 2 !== 0 ? '' : 'self-end'" class="text-xs text-gray-500">07:40 AM</span>
        </div>
      </div>

      <div class="flex gap-2 p-4">
        <UInput placeholder="Type a message" class="w-full" />
        <UButton icon="i-heroicons-paper-airplane" />
      </div>

    </USlideover>
  </template> -->
</template>