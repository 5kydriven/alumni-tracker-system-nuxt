<template>
  <div class="flex flex-col gap-2">
    <label class="text-xl">Your Job Posts</label>
    <div
      class="h-80 w-full rounded flex flex-col items-center justify-center gap-4 border dark:border-gray-800 border-gray-200">
      <div class="flex flex-col items-center">
        <UIcon name="i-heroicons-briefcase" class="w-20 h-20 text-gray-500" />
        <label class="text-gray-500 text-lg">
          Your job post will appear here
        </label>
      </div>

      <UButton icon="i-heroicons-plus" label="Add my first job post" />

    </div>

  </div>

  <!-- <div class="flex flex-col gap-2">
      <label class="text-xl">Your workers</label>
      <div
        class="h-80 w-full rounded flex flex-col justify-center items-center gap-4 border dark:border-gray-800 border-gray-200">
        <div class="flex flex-col items-center">
          <UIcon name="i-heroicons-users" class="w-20 h-20 text-gray-500" />
          <label class="text-gray-500 text-lg">
            Your hires and prospects will appear here
          </label>
        </div>
        <UButton icon="i-heroicons-plus" label="Add my first job post" />
      </div>

    </div> -->
</template>