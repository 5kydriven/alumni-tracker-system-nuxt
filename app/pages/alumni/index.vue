<script setup lang="ts">
definePageMeta({
  layout: "user",
});
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="border pb-4 rounded border-gray-200 dark:border-gray-800">
      <div class="relative">
        <div class="h-52 bg-primary-700 w-full relative z-0 rounded-t">
          <UAvatar alt="M" size="3xl" class="w-32 h-32 text-large absolute bottom-[-3rem] left-6 rounded-full" />
        </div>
        <div class="mt-12 px-8 pb-0">
          <div class="flex flex-col">
            <label class="text-2xl font-bold">Name</label>
            <span class="text-gray-400">Ylagan ext., San Carlos City, Negros Occidental</span>
          </div>
        </div>
      </div>
      <div class="px-8 flex flex-col">
        <span>About Me</span>
        <p class="text-gray-400 text-sm xl:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          laboriosam iste tempora exercitationem, ab officia placeat
          consequuntur. Accusamus, consectetur sunt. Ea illo velit voluptatum
          numquam eveniet beatae ex, totam perspiciatis.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4 w-full border-gray-200 border py-4 px-8 rounded dark:border-gray-800">
      <label class="font-bold text-lg">Experience</label>
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 w-full border border-gray-200 py-4 px-8 rounded dark:border-gray-800">
      <label class="font-bold text-lg">Education</label>
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <UAvatar label="P" class="!rounded" size="lg" />
          <div class="flex flex-col">
            <label class="font-bold">Information Technology Intern</label>
            <span class="font-thin">Newfold Digital</span>
            <span class="dark:text-gray-400 text-xs">Oct 2023 - present . 1 yr 1 mo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>