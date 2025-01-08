<script setup lang="ts">
  definePageMeta({
    layout: 'user'
  })

  interface User {
    name: String,
    date: String,
    message: String
  }

  // const { data } = await useFetch<User[]>('/api/messages')
</script>

<template>
  <div class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
    <InboxMessageList />
    <InboxDefaultMessage />
    <!-- <InboxMessage v-else /> -->
  </div>
</template>