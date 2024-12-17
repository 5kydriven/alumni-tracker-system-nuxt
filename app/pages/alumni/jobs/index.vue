<script setup lang="ts">
  import { ref } from 'vue';

  definePageMeta({
    layout: 'user',
  });

  const categories = ref([
    { name: 'Full Time', key: 'A' },
    { name: 'Part Time', key: 'M' },
    { name: 'Freelancing', key: 'P' },
    { name: 'Fixed Price', key: 'R' },
    { name: 'Remote', key: 'R' },
    { name: 'Hourly Basis', key: 'R' },
    { name: 'Hybrid', key: 'R' },
  ]);

  const jobs = ref(Array.from({ length: 100 }))
</script>

<template>
  <div class="flex gap-4 p-4 flex-col xl:flex-row">
    <div class="w-full xl:w-80 ">
      <div class="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded sticky top-4">
        <UInput placeholder="Search..." type="text" icon="i-heroicons-magnifying-glass" />
        <div class="flex flex-col gap-1.5">
          <label class="text-lg">Job Types</label>
          <div class="flex flex-col gap-1 dark:text-gray-500 text-gray-400">
            <UCheckbox v-for="category of categories">
              <template #label>
                <span class="dark:text-gray-500 text-gray-400">{{ category.name }}</span>
              </template>
            </UCheckbox>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col gap-4">
      <div v-for="(item, index) in jobs" :key="index"
        class="w-full border dark:border-gray-800 p-4 border-gray-200 rounded-lg flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="flex flex-col gap-2">
            <label class="text-xl flex gap-2 items-center">
              Web Designer<span class="text-sm dark:text-gray-500 text-gray-400">2 days ago</span>
            </label>
            <div class="flex gap-2">
              <UBadge size="sm" label="Full Time" variant="soft" />
              <UBadge size="sm" label="Hybrid" variant="soft" />
              <span class="dark:text-gray-500 text-gray-400">30k/month</span>
            </div>
          </div>
          <div>
            <UButton icon="i-heroicons-bookmark" color="primary" variant="ghost" />
          </div>
        </div>
        <div>
          <p class="dark:text-gray-500 text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            quae doloremque illo. Quisquam reprehenderit eius magnam,
            accusantium, porro doloremque praesentium cumque, quaerat aperiam
            provident iste quos ab dolores perferendis eos.
          </p>
        </div>
        <div class="flex justify-end">
          <UButton label="View more" to="/alumni/jobs/job-detail" color="gray" />
        </div>
      </div>
    </div>
  </div>
</template>
