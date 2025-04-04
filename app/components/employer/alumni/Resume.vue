<script setup lang="ts">
	// import { format } from 'date-fns';

	const user = await getCurrentUser();
	const props = defineProps<{ uid?: string }>();

	const { data: conversations } = useLazyFetch<H3Response<Conversations>>(
		`/api/conversation/${props.uid}`,
	);

	const alumnniUid = computed(() =>
		conversations.value?.data?.participants.find(
			(uid: string) => uid !== user.uid,
		),
	);

	const response = ref<User<AlumniCredentials>>();
	const status = ref<'loading' | 'success' | 'error'>('loading');
	const experience = ref<WorkExperience[]>();
	const education = ref<EducationalBackground[]>();

	watchEffect(async () => {
		if (alumnniUid.value) {
			status.value = 'loading';
			try {
				const res = await $fetch<H3Response<User<AlumniCredentials>>>(
					`/api/user/${alumnniUid.value}`,
				);
				response.value = res.data;
				const expRes = await $fetch<H3Response<WorkExperience[]>>(
					`/api/alumni/experience/${alumni.value.uid}`,
				);
				experience.value = expRes.data;
				const eduRes = await $fetch<H3Response<WorkExperience[]>>(
					`/api/alumni/education/${alumni.value.uid}`,
				);
				education.value = eduRes.data;
				status.value = 'success';
			} catch (error) {
				status.value = 'error';
			}
		}
	});

	const alumni = computed(() => response.value || {});

	const emits = defineEmits<{
		close: [];
	}>();
</script>

<template>
	<UModal fullscreen>
		<UCard
			:ui="{
				base: 'h-full flex flex-col',
				rounded: '',
				divide: 'divide-y divide-gray-300 dark:divide-gray-800',
				body: {
					base: 'grow',
				},
			}">
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Applicant Information
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="emits('close')" />
				</div>
			</template>

			<div
				v-if="status !== 'success'"
				class="font-bold text-lg">
				Loading...
			</div>

			<!-- Alumni Info -->
			<UContainer
				v-else
				class="flex flex-col gap-4">
				<div
					class="flex justify-between items-start flex-col sm:flex-row gap-4 sm:gap-0">
					<div class="flex flex-col">
						<label class="font-bold md:text-3xl capitalize">{{
							alumni.name
						}}</label>
						<label>
							{{ alumni.userCredentials?.city }},
							{{ alumni.userCredentials?.province }}
						</label>
					</div>
					<div class="flex flex-col text-black">
						<label class="text-lg font-semibold mb-2"> Contact </label>
						<div class="flex items-center gap-2">
							<UIcon
								name="i-heroicons-phone"
								class="w-5 h-5" />
							<label>
								{{ alumni.userCredentials?.phoneNumber }}
							</label>
						</div>
						<div class="flex items-center gap-2">
							<UIcon
								name="i-heroicons-envelope"
								class="w-5 h-5" />
							<label>
								{{ alumni.email }}
							</label>
						</div>
					</div>
				</div>

				<!-- About -->
				<div class="flex flex-col gap-2">
					<div class="flex flex-col mb-2">
						<label class="text-lg font-semibold">About</label>
						<UDivider />
					</div>
					<p>{{ alumni.userCredentials?.description }}</p>
				</div>

				<!-- Experience -->
				<div class="flex flex-col gap-2">
					<div class="flex flex-col mb-2">
						<label class="text-lg font-semibold">Experience</label>
						<UDivider />
					</div>
					<div
						class="flex justify-start gap-12"
						v-for="item in experience">
						<div class="flex gap-2 w-32">
							<span
								>{{ item.startDate?.month }}/{{ item.startDate?.year }}</span
							>
							<span>-</span>
							<span>{{ item.endDate?.month }}/{{ item.endDate?.year }}</span>
						</div>
						<div class="flex flex-col">
							<label class="font-bold">{{ item.jobTitle }}</label>
							<div class="flex gap-2 text-gray-500">
								<label>{{ item.companyName }}, </label>
								<span>{{ item.companyAddress }}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Education -->
				<div class="flex flex-col gap-2">
					<div class="flex flex-col mb-2">
						<label class="text-lg font-semibold">Education</label>
						<UDivider />
					</div>
					<div
						class="flex justify-start gap-12"
						v-for="item in education">
						<div class="flex gap-2 w-32">
							<span>{{ item.startDate }}</span>
							<span>-</span>
							<span>{{ item.endDate }}</span>
						</div>
						<div class="flex flex-col">
							<label class="font-bold">{{ item.schoolName }}</label>
							<label class="text-gray-500">{{ item.schoolAddress }} </label>
						</div>
					</div>
				</div>
			</UContainer>
		</UCard>
	</UModal>
</template>
