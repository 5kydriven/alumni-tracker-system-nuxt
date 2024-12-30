<script setup lang="ts">
import { AddUserModal } from "#components";
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
});

const modal = useModal();
const toast = useToast();

const people = ["Wade Cooper", "Arlene Mccoy", "Devon Webb"];
const selectedRole = ref([]);
const store = useAdminStore();

const { status } = useAsyncData("users", () =>
  store.getUsers().then(() => true)
);

console.log(status);
const columns = [
  { key: "id", label: "No." },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "password", label: "Password" },
  { key: "role", label: "Role" },
  { key: "actions" },
];

async function handleDelete(uid: string) {
  const res = await store.deleteUser(uid);
  if (res.statusCode === 200) {
    toast.add({
      title: "Success",
      description: res.statusMessage,
      icon: "i-heroicons-check-circle",
    });
  } else {
    toast.add({
      title: "Error",
      description: res.statusMessage,
      color: "red",
      icon: "i-heroicons-exclamation-circle",
    });
  }
}
</script>

<template>
  <div>
    <Navbar>
      <label>User's</label>
      <div class="flex items-center gap-4">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          :trailing="false"
          placeholder="Search..."
        />
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="gray"
          variant="solid"
          label="Add User"
          trailing
          @click="modal.open(AddUserModal)"
        />
      </div>
    </Navbar>
    <SubNavbar>
      <div class="flex items-center gap-4">
        <USelectMenu
          v-model="selectedRole"
          :options="['Registar', 'Employer']"
          multiple
          placeholder="Select Role"
        />
        <!-- <USelectMenu v-model="selected" :options="people" multiple placeholder="Location" /> -->
      </div>
      <!-- <USelectMenu v-model="selected" :options="people" multiple placeholder="Display" /> -->
    </SubNavbar>
    <div class="flex flex-col justify-between h-[calc(100vh-113px)]">
      <UTable
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No items.',
        }"
        :rows="store.rows"
        :columns="columns"
        class="w-full"
      >
        <template #id-data="{ index }">{{ index + 1 }}</template>
        <template #actions-data="{ row }">
          <UDropdown
            :items="[
              [
                {
                  label: 'Edit',
                  icon: 'i-heroicons-pencil-square-20-solid',
                },
                {
                  label: 'Delete',
                  icon: 'i-heroicons-trash-20-solid',
                  click: () => {
                    handleDelete(row.uid);
                  },
                },
              ],
            ]"
          >
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div
        :class="store.users.length <= 13 ? 'hidden' : 'flex'"
        class="justify-end p-4 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="store.page"
          :page-count="store.pageCount"
          :total="store.users.length"
        />
      </div>
    </div>
  </div>
</template>