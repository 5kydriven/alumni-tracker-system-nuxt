<script setup lang="ts">
definePageMeta({
  layout: 'user'
})

const route = useRoute()
const router = useRouter()

const { data: job, status, error } = await useLazyFetch<any>(`/api/job/${route.params.jobUid}`, { method: 'GET' })

if (error.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}
</script>

<template>
  <div class="flex gap-4  flex-col xl:flex-row p-4">
    <template v-if="status == 'success' && job.createdAt">
      <JobHeader v-bind="job" />
      <JobDescription v-bind="job" />
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
