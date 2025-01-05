<script setup lang="ts">
definePageMeta({
  layout: 'user'
})

const route = useRoute()
const { convertToDate } = useConverter()

const { data: job, status } = await useLazyFetch<Job>(`/api/job/${route.params.jobUid}`, { method: 'GET' })
</script>

<template>
  <div class="flex gap-4  flex-col xl:flex-row p-4">
    <template v-if="status == 'success'">
      <div class="w-full xl:w-80">
        <div class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-200 dark:border-gray-800 rounded sticky top-4">
          <label class="xl:text-xl">Job Information</label>
          <div class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-briefcase" class="w-6 h-6" />
              <div class="flex flex-col">
                <p class="text-sm xl:text-lg">Job Type</p>
                <span class="text-primary text-xs xl:text-sm capitalize">{{ job.type }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6" />
              <div class="flex flex-col">
                <p class="text-sm xl:text-lg">Wage/Salary</p>
                <span class="text-primary text-xs xl:text-sm">{{ job.salary }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-clock" class="w-6 h-6" />
              <div class="flex flex-col">
                <p class="text-sm xl:text-lg">Hours per week</p>
                <span class="text-primary text-xs xl:text-sm">{{ job.desiredWeeklyHours }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calendar" class="w-6 h-6" />
              <div class="flex flex-col">
                <p class="text-sm xl:text-lg">Date Posted</p>
                <span class="text-primary text-xs xl:text-sm">{{ convertToDate(job.createdAt) }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <UAvatar :alt="job.title" :ui="{ rounded: 'rounded' }" size="lg" />
            <div class="flex flex-col">
              <label class="capitalize">{{ job.title }}</label>
              <span class="text-sm text-gray-500">{{ job.contactPerson }} ({{ job.email }})</span>
            </div>
          </div>
          <div>
            <UButton label="Apply" />
          </div>
        </div>
        <UDivider class="mt-2 mb-4 " />
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <p v-html="job.description.replace(/\n/g, '<br>')"></p>
          </div>
          <div class=" flex justify-end">
            <!-- <UButton>
              Apply Now
            </UButton> -->
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="w-full xl:w-80">
        <div class="flex flex-col xl:gap-4 gap-2 p-4 border border-gray-200 dark:border-gray-800 rounded sticky top-4">
          <USkeleton class="w-[110px] h-[24px]" />
          <div class="flex flex-wrap xl:flex-col gap-2 justify-between xl:gap-1.5">
            <div class="flex items-center gap-2" v-for="(item, index) in 4" :key="index">
              <USkeleton class="w-[36px] h-[36px]" />
              <div class="flex flex-col gap-2">
                <USkeleton class="w-[75px] h-[36px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <USkeleton class="w-[48px] h-[48px]" />
            <div class="flex flex-col">
              <USkeleton class="w-[150px] h-[48px]" />
            </div>
          </div>
          <div>
            <USkeleton class="w-[55px] h-[32px]" />
          </div>
        </div>
        <UDivider class="mt-2 mb-4 " />
        <div class="flex flex-col">
          <USkeleton class="h-[250px]" />
        </div>
      </div>
    </template>
  </div>

</template>
