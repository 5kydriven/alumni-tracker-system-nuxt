<script setup lang="ts">
definePageMeta({
  layout: "user",
});

const user = useCurrentUser()
const { data: alumni } = useFetch<Alumni>(`/api/alumni/${user.value.uid}`, { method: 'GET' })

</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <Profile v-bind="alumni" />

    <!-- <div class="flex flex-col gap-4 w-full border-gray-200 border py-4 px-8 rounded dark:border-gray-800">
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
    </div> -->
  </div>
</template>