<script setup lang="ts">
  definePageMeta({
    layout: 'user'
  })
</script>

<template>
  <div class="flex h-full xl:border xl:border-b-none xl:rounded-t dark:border-gray-800">
    <InboxMessageList />
    <InboxMessage />
  </div>
</template>