<script setup lang="ts">
import { AddStudentModal } from "#components";

definePageMeta({
  layout: "registrar",
});

const modal = useModal();

const store = useRegistrarStore();
const { status, data } = useAsyncData(
  "alumni",
  async () => await store.getAlumni()
);
console.log(data.value);
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "course", label: "Course" },
  { key: "email", label: "Email" },
  { key: "batch", label: "Batch" },
  { key: "status", label: "Status" },
];
const people = ["Wade Cooper", "Arlene Mccoy", "Devon Webb"];

const selected = ref<Alumni[]>();
</script>

<template>
  <div>
    <Navbar>
      <label class="hidden lg:block">Alumni's</label>
      <div class="flex items-center gap-4">
        <!-- <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          :trailing="false"
          placeholder="Search..."
          v-model="q"
        /> -->
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="gray"
          variant="solid"
          label="Add Alumni"
          trailing
          @click="modal.open(AddStudentModal)"
        />
      </div>
    </Navbar>
    <SubNavbar>
      <div class="flex items-center gap-4 w-full">
        <USelectMenu multiple placeholder="Select Status" />
        <USelectMenu :options="people" multiple placeholder="Location" />
      </div>
      <USelectMenu :options="people" multiple placeholder="Display" />
    </SubNavbar>
    <UTable
      :loading="status != 'success' ? true : false"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      class="w-full"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No items.',
      }"
      :rows="store.alumni"
      :columns="columns"
    >
      <template #id-data="{ index }">{{ index + 1 }}</template>
    </UTable>
  </div>
</template>