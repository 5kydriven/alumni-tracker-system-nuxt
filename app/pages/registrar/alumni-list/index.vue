<script setup lang="ts">
  import { AddStudentModal } from '#components';
  import type { Alumni } from '~~/types';

  definePageMeta({
    layout: 'registrar'
  })

  const modal = useModal()
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'course', label: 'Course' },
    { key: 'email', label: 'Email' },
    { key: 'batch', label: 'Batch' },
    { key: 'status', label: 'Status' }
  ]
  const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb']

  const q = ref('')
  const selected = ref<Alumni[]>([])
  const selectedStatus = ref([])
  const query = computed(() => ({ q: q.value, status: selectedStatus.value }))
  const { data: alumni } = await useFetch<Alumni[]>('/api/alumni', { query, default: () => [] })

  const defaultStatuses = alumni.value.reduce((acc, alumni) => {
    if (!acc.includes(alumni.status)) {
      acc.push(alumni.status)
    }
    return acc
  }, [] as string[])

  function onSelect(row: Alumni) {
    const index = selected.value.findIndex(item => item.id === row.id)
    if (index === -1) {
      selected.value.push(row)
    } else {
      selected.value.splice(index, 1)
    }
  }
</script>

<template>
  <div>
    <Navbar>
      <label class="hidden lg:block">Alumni's</label>
      <div class="flex items-center gap-4">
        <UInput icon="i-heroicons-magnifying-glass-20-solid" size="sm" color="white" :trailing="false"
          placeholder="Search..." v-model="q" />
        <UButton icon="i-heroicons-pencil-square" size="sm" color="gray" variant="solid" label="Add Alumni" trailing
          @click="modal.open(AddStudentModal)" />
      </div>
    </Navbar>
    <SubNavbar>
      <div class="flex items-center gap-4 w-full">
        <USelectMenu v-model="selectedStatus" :options="defaultStatuses" multiple placeholder="Select Status" />
        <USelectMenu v-model="selected" :options="people" multiple placeholder="Location" />
      </div>
      <USelectMenu v-model="selected" :options="people" multiple placeholder="Display" />
    </SubNavbar>
    <UTable class="w-full" v-model="selected" @select="onSelect"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" :rows="alumni"
      :columns="columns" />
  </div>
</template>