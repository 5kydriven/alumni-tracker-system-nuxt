<script setup lang="ts">
  const items = [
    {
      label: 'Work Experience',
      slot: 'experience'
    }, {
      label: 'Skills',
      slot: 'skills'
    }
  ]

  const workType = ref()

  const works = [
    {
      label: 'Software Dev',
      slot: 'work',
      date: 'September 2024 - January 2025',
      defaultOpen: true,
    },
    {
      label: 'Backend Dev',
      slot: 'work',
      date: 'September 2024 - January 2025',
    }
  ]

  const skills = [
    {
      label: 'Javascript',
      slot: 'skill',
      level: 'Intermediate',
      defaultOpen: true,
    },
    {
      label: 'Backend Dev',
      slot: 'skill',
      level: 'Intermediate',
    }
  ]
</script>

<template>
  <UAccordion multiple size="lg" color="gray" variant="solid" :items="items">
    <template #experience>
      <div class=" p-2 flex gap-4 flex-col">
        <UAccordion :items="works" :ui="{ wrapper: 'flex flex-col gap-2 w-full' }">
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="ghost" class="border-b border-gray-200 rounded-none dark:border-gray-700"
              :class="[open && 'p-0 border-0']">

              <div :class="[open && 'hidden']" class="flex justify-between w-full">
                <div class="flex flex-col items-start">
                  <label class="font-bold">{{ item.label }}</label>
                  <span class="text-gray-500">{{ item.date }}</span>
                </div>
                <UButton icon="i-heroicons-trash" @click="console.log('Button clicked')" class="z-50" variant="ghost"
                  color="gray" />
              </div>
            </UButton>
          </template>
          <template #work>
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-4 gap-y-2">
              <UFormGroup label="Job Title">
                <UInput placeholder="you@example.com" />
              </UFormGroup>
              <UFormGroup label="Company Name">
                <UInput placeholder="you@example.com" />
              </UFormGroup>
              <UFormGroup label="Address">
                <UInput placeholder="you@example.com" />
              </UFormGroup>
              <UFormGroup label="Work Type">
                <USelectMenu v-model="workType" :options="['Full Time', 'Part Time', 'Contract', 'Freelance', 'Intern']"
                  placeholder="Select Work Type" />
              </UFormGroup>
              <UFormGroup label="Start Date">
                <UInput placeholder="eg. Semptember 2023" />
              </UFormGroup>
              <UFormGroup label="End Date">
                <UInput placeholder="eg. Semptember 2024" />
              </UFormGroup>
            </div>
          </template>
        </UAccordion>
        <UButton label="Add work experience" icon="i-heroicons-plus-circle" block variant="soft" />
      </div>
    </template>

    <template #skills>
      <div class=" p-2 flex gap-4 flex-col">
        <UAccordion :items="skills" :ui="{ wrapper: 'flex flex-col gap-2 w-full' }">
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="ghost" class="border-b border-gray-200 rounded-none dark:border-gray-700"
              :class="[open && 'p-0 border-0']">

              <div :class="[open && 'hidden']" class="flex justify-between w-full">
                <div class="flex flex-col items-start">
                  <label class="font-bold">{{ item.label }}</label>
                  <span class="text-gray-500">{{ item.level }}</span>
                </div>
                <UButton icon="i-heroicons-trash" @click="console.log('Button clicked')" class="z-50" variant="ghost"
                  color="gray" />
              </div>
            </UButton>
          </template>
          <template #skill>
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-4 gap-y-2">
              <UFormGroup label="Skill">
                <UInput placeholder="e.g. javascript" />
              </UFormGroup>
              <UFormGroup label="Level">
                <USelectMenu v-model="workType" :options="['Beginner', 'Intermediate', 'Experienced', 'Expert']"
                  placeholder="Select Level" />
              </UFormGroup>
            </div>
          </template>
        </UAccordion>
        <UButton label="Add skill" icon="i-heroicons-plus-circle" block variant="soft" />
      </div>
    </template>
  </UAccordion>
</template>
