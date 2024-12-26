<script setup lang="ts">
import { useAdminStore } from "~/stores/admin";
import type { User } from "~~/types/user";

const toast = useToast();
const modal = useModal();
const store = useAdminStore();

const user = reactive({
  name: "",
  email: "",
  password: "",
  role: "",
});

const handleSubmit = async (user: User) => {
  const res = await store.createUser(user);

  if (res.statusCode == 200) {
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
  modal.close();
};
</script>

<template>
  <UModal>
    <form @submit.prevent="handleSubmit(user)">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Create User
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="modal.close()"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <UFormGroup label="Name">
            <UInput required v-model="user.name" type="text" size="sm" />
          </UFormGroup>
          <UFormGroup label="Email">
            <UInput required v-model="user.email" type="email" size="sm" />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput
              required
              v-model="user.password"
              type="password"
              size="sm"
            />
          </UFormGroup>
          <UFormGroup label="Role">
            <USelectMenu
              required
              v-model="user.role"
              :options="['registrar', 'employer']"
              placeholder="Select role"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              @click="modal.close()"
              variant="solid"
              label="Cancel"
            />
            <UButton
              variant="solid"
              type="submit"
              label="Create"
              :loading="store.isLoading"
            />
          </div>
        </template>
      </UCard>
    </form>
  </UModal>
</template>