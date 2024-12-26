<script setup lang="ts">
import { useExperienceStore } from "~/stores/experience";

const store = useExperienceStore();
const items = [
  {
    label: "Work Experience",
    slot: "experience",
  },
  {
    label: "Skills",
    slot: "skills",
  },
];

const skills = [
  {
    label: "Javascript",
    slot: "skill",
    level: "Intermediate",
    defaultOpen: true,
  },
  {
    label: "Backend Dev",
    slot: "skill",
    level: "Intermediate",
  },
];

const experience = reactive<Experience>({ slot: "work" });

const workType = ref([
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "intern", label: "Intern" },
]);
</script>

<template>
  <UAccordion multiple size="lg" color="gray" variant="solid" :items="items">
    <template #experience>
      <form
        @submit.prevent="store.addExperience(experience)"
        class="p-2 flex gap-4 flex-col"
      >
        <UAccordion
          :items="store.workExperiences"
          :ui="{ wrapper: 'flex flex-col gap-2 w-full' }"
        >
          <template #work>
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-4 gap-y-2">
              <UFormGroup label="Job Title">
                <UInput
                  placeholder="Enter a job title"
                  required
                  v-model="experience.jobTitle"
                />
              </UFormGroup>
              <UFormGroup label="Company Name">
                <UInput
                  placeholder="Enter a company name"
                  required
                  v-model="experience.companyName"
                />
              </UFormGroup>
              <UFormGroup label="Address">
                <UInput
                  placeholder="Enter an address"
                  required
                  v-model="experience.address"
                />
              </UFormGroup>
              <UFormGroup label="Work Type">
                <USelect
                  v-model="experience.workType"
                  class="text-white"
                  equired
                  :options="workType"
                  placeholder="Select Work Type"
                />
              </UFormGroup>
              <UFormGroup label="Start Date">
                <UInput
                  placeholder="e.g., September 2023"
                  required
                  v-model="experience.startDate"
                />
              </UFormGroup>
              <UFormGroup label="End Date">
                <UInput
                  placeholder="e.g., September 2024"
                  required
                  v-model="experience.endDate"
                />
              </UFormGroup>
            </div>
          </template>
          <template #default="{ item, open, index }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-b border-gray-200 rounded-none dark:border-gray-700"
              :class="[open && 'p-0 border-0']"
            >
              <div
                :class="[open && 'hidden']"
                class="flex justify-between w-full"
              >
                <div class="flex flex-col items-start">
                  <label class="font-bold">{{
                    item.jobTitle || "New Work Experience"
                  }}</label>
                  <label class="text-gray-500">
                    {{ item.startDate || "Start Date" }} ~
                    {{ item.endDate || "End Date" }}
                  </label>
                </div>
                <UButton
                  icon="i-heroicons-trash"
                  @click="store.removeExperience(index)"
                  class="z-50"
                  variant="ghost"
                  color="gray"
                />
              </div>
            </UButton>
          </template>
        </UAccordion>
        <UButton
          label="Add Work Experience"
          type="submit"
          icon="i-heroicons-plus-circle"
          block
          variant="soft"
        />
      </form>
    </template>

    <template #skills>
      <div class="p-2 flex gap-4 flex-col">
        <UAccordion
          :items="skills"
          :ui="{ wrapper: 'flex flex-col gap-2 w-full' }"
        >
          <template #default="{ item, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-b border-gray-200 rounded-none dark:border-gray-700"
              :class="[open && 'p-0 border-0']"
            >
              <div
                :class="[open && 'hidden']"
                class="flex justify-between w-full"
              >
                <div class="flex flex-col items-start">
                  <label class="font-bold">{{ item.label }}</label>
                  <span class="text-gray-500">{{ item.level }}</span>
                </div>
                <UButton
                  icon="i-heroicons-trash"
                  @click="console.log('Button clicked')"
                  class="z-50"
                  variant="ghost"
                  color="gray"
                />
              </div>
            </UButton>
          </template>
          <template #skill>
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-4 gap-y-2">
              <UFormGroup label="Skill">
                <UInput placeholder="e.g. javascript" />
              </UFormGroup>
              <UFormGroup label="Level">
                <USelectMenu
                  :options="[
                    'Beginner',
                    'Intermediate',
                    'Experienced',
                    'Expert',
                  ]"
                  placeholder="Select Level"
                />
              </UFormGroup>
            </div>
          </template>
        </UAccordion>
        <UButton
          label="Add skill"
          icon="i-heroicons-plus-circle"
          block
          variant="soft"
        />
      </div>
    </template>
  </UAccordion>
</template>
