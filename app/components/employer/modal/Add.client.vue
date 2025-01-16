<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
	title: z.string().nonempty('Job title is required'),
	type: z.string().nonempty('Employement type is required'),
	email: z.string().nonempty('Email is required').email('Invalid email'),
	contactPerson: z.string().nonempty('Contact person is required'),
	salary: z.string().nonempty('Salary is required'),
	desiredWeeklyHours: z.string().nonempty('Desired weekly hours is required'),
	description: z.string().nonempty('Description is required').min(50, 'Description must be at least 50 characters')
})

type Schema = z.output<typeof schema>

const form = reactive<Job>({
	title: '',
	type: '',
	email: '',
	contactPerson: '',
	salary: '',
	desiredWeeklyHours: '',
	description: ''
})

const user = useCurrentUser()
const store = useEmployerStore()
const { toastResponse } = useToastComposables()

const employmentTypes = [
	{ name: 'Full-Time', value: 'full time' },
	{ name: 'Part-Time', value: 'part time' },
	{ name: 'Internship', value: 'internship' },
	{ name: 'Contract', value: 'contract' },
	{ name: 'Freelance', value: 'freelance' },
	{ name: 'Other', value: 'other' }
];

const emits = defineEmits<{
	close: []
}>();

const props = defineProps<{
	job?: Job
	index?: number
}>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
	if (props.job?.id) {
		console.log('edit')
	} else {
		const res = await store.createJob(event.data, user.value.uid)
		toastResponse(res)
	}
	emits('close')
}

watch(() => props.job, (newJob) => {
	if (newJob) {
		Object.assign(form, newJob)
	}
},
	{ immediate: true }
)
</script>

<template>
	<UModal fullscreen>
		<UForm :schema="schema" :state="form" @submit.prevent="onSubmit">
			<UCard class="flex flex-col h-full" :ui="{
				ring: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				body: {
					base: 'h-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-auto'
				}
			}">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							{{ !props.job ? 'Post a job' : 'Edit job' }} {{ props.index }}
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="emits('close')" />
					</div>
				</template>

				<UFormGroup label="Job title" name="title" required>
					<UInput placeholder="Who do you need?" v-model="form.title" />
				</UFormGroup>
				<UFormGroup label="Type of employment" name="type" required>
					<USelect placeholder="Select employment" :options="employmentTypes" option-attribute="name"
						v-model="form.type" />
				</UFormGroup>
				<UFormGroup label="Email" name="email" required>
					<UInput placeholder="example@gmail.com" v-model="form.email" />
				</UFormGroup>
				<UFormGroup label="Contact person" name="contactPerson" required>
					<UInput placeholder="John Doe" v-model="form.contactPerson" />
				</UFormGroup>
				<UFormGroup label="Wage/Salary per month" name="salary" required>
					<UInput placeholder="Select employment" v-model="form.salary" />
				</UFormGroup>
				<UFormGroup label="Desired no. of hours per week" name="desiredWeeklyHours" required>
					<UInput placeholder="Select employment" v-model="form.desiredWeeklyHours" />
				</UFormGroup>
				<UFormGroup label="Description" required name="description" class="col-span-1 md:col-span-2">
					<UTextarea class="h-52" :ui="{ form: 'h-full' }" placeholder="Search..." v-model="form.description" />
				</UFormGroup>


				<template #footer>
					<div class="flex justify-end gap-2">
						<UButton color="gray" @click="emits('close')" variant="solid" label="Cancel" />
						<UButton variant="solid" type="submit" :label="props.job ? 'Save' : 'Add job'" :loading="store.isLoading" />
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>