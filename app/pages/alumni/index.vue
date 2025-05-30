<script setup lang="ts">
	import {
		AlumniAddEducation,
		AlumniAddExperience,
		AlumniDeleteExperience,
		AlumniDeleteEducation,
		AlumniAddSeminar,
		AlumniDeleteSeminar,
	} from '#components';

	definePageMeta({
		middleware: ['alumni'],
		layout: 'user',
	});

	const user = useCurrentUser();
	const modal = useModal();
	const { formatMonthYear } = useFormatter();
	const { calculateDuration } = useCalculator();

	const { data: alumni } = useAsyncData('alumni-profile', async () => {
		if (!user.value?.uid) return null;

		const [data, experience, education, seminar] = await Promise.all([
			$fetch<H3Response<User<AlumniCredentials>>>(
				`/api/alumni/${user.value.uid}`,
			),
			$fetch<H3Response<WorkExperience[]>>(
				`/api/alumni/experience/${user.value.uid}`,
			),
			$fetch<H3Response<EducationalBackground[]>>(
				`/api/alumni/education/${user.value.uid}`,
			),
			$fetch<H3Response<Seminar[]>>(`/api/alumni/seminar/${user.value.uid}`),
		]);

		return {
			...data.data,
			userCredentials: {
				...data.data?.userCredentials,
				workExperience: experience.data,
				educationalBackground: education.data,
				seminars: seminar.data,
			},
		};
	});

	watchEffect(() => {
		if (alumni.value) {
			console.log(alumni.value.userCredentials);
		}
	});
</script>

<template>
	<div class="flex flex-col gap-4 p-4 lg:max-w-screen-xl lg:mx-auto w-full">
		<AlumniProfile v-bind="alumni" />

		<div
			class="flex flex-col gap-4 w-full bg-white border-gray-300 border py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<div class="flex gap-2 items-center">
				<label class="font-bold text-lg">Work Experience</label>
				<UButton
					v-show="(alumni?.userCredentials.workExperience?.length ?? 0) > 0"
					icon="i-heroicons-plus"
					size="2xs"
					@click="
						modal.open(AlumniAddExperience, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					" />
			</div>
			<div
				class="flex flex-col gap-2"
				v-if="(alumni?.userCredentials.workExperience?.length ?? 0) > 0">
				<div
					v-for="experience in alumni?.userCredentials.workExperience"
					class="flex items-center gap-2">
					<UButton
						icon="i-heroicons-trash-solid"
						size="2xs"
						color="red"
						class="mr-2"
						variant="soft"
						@click="
							modal.open(AlumniDeleteExperience, {
								onClose: modal.close,
								userUid: user?.uid,
								experienceUid: experience.uid,
							})
						" />
					<UAvatar
						:alt="experience.companyName?.toUpperCase()"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col text-base/5">
						<label class="font-bold capitalize">{{
							experience.companyName
						}}</label>
						<span class="font-thin capitalize">{{ experience.jobTitle }}</span>
						<span class="dark:text-gray-400 text-xs"
							>{{ formatMonthYear(experience.startDate as ExperienceDate) }} -
							{{ formatMonthYear(experience.endDate as ExperienceDate) }} .
							{{
								calculateDuration(
									experience.startDate as ExperienceDate,
									experience.endDate as ExperienceDate,
								)
							}}</span
						>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center items-center p-8"
				v-else>
				<UButton
					icon="i-heroicons-plus"
					size="sm"
					label="Add experience"
					@click="
						modal.open(AlumniAddExperience, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					"
					variant="soft" />
			</div>
		</div>

		<div
			class="flex flex-col gap-4 w-full bg-white border border-gray-300 py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<div class="flex gap-2 items-center">
				<label class="font-bold text-lg">Educational Attainment</label>
				<UButton
					v-show="
						(alumni?.userCredentials.educationalBackground?.length ?? 0) > 0
					"
					icon="i-heroicons-plus"
					size="2xs"
					@click="
						modal.open(AlumniAddEducation, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					" />
			</div>
			<div
				class="flex flex-col gap-2"
				v-if="(alumni?.userCredentials.educationalBackground?.length ?? 0) > 0">
				<div
					class="flex items-center gap-2"
					v-for="education in alumni?.userCredentials.educationalBackground">
					<UButton
						icon="i-heroicons-trash-solid"
						size="2xs"
						color="red"
						class="mr-2"
						variant="soft"
						@click="
							modal.open(AlumniDeleteEducation, {
								onClose: modal.close,
								userUid: user?.uid,
								educationUid: education.uid,
							})
						" />
					<UAvatar
						:alt="education.schoolName?.toUpperCase()"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col text-base/5">
						<label class="font-bold capitalize">{{
							education.schoolName
						}}</label>
						<span class="font-thin capitalize">{{
							education.schoolAddress
						}}</span>
						<span class="dark:text-gray-400 text-xs"
							>{{ education.startDate }} - {{ education.endDate }}</span
						>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center items-center p-8"
				v-else>
				<UButton
					icon="i-heroicons-plus"
					size="sm"
					@click="
						modal.open(AlumniAddEducation, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					"
					label="Add education"
					variant="soft" />
			</div>
		</div>

		<div
			class="flex flex-col gap-4 w-full bg-white border border-gray-300 py-4 px-8 rounded-lg shadow-lg dark:border-gray-800">
			<div class="flex gap-2 items-center">
				<label class="font-bold text-lg">Seminar/Trainings</label>
				<UButton
					v-show="
						(alumni?.userCredentials.educationalBackground?.length ?? 0) > 0
					"
					icon="i-heroicons-plus"
					size="2xs"
					@click="
						modal.open(AlumniAddSeminar, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					" />
			</div>
			<div
				class="flex flex-col gap-2"
				v-if="(alumni?.userCredentials.seminars?.length ?? 0) > 0">
				<div
					class="flex items-center gap-2"
					v-for="seminar in alumni?.userCredentials.seminars">
					<UButton
						icon="i-heroicons-trash-solid"
						size="2xs"
						color="red"
						class="mr-2"
						variant="soft"
						@click="
							modal.open(AlumniDeleteSeminar, {
								onClose: modal.close,
								userUid: user?.uid,
								educationUid: seminar.uid,
							})
						" />
					<UAvatar
						:alt="seminar.name?.toUpperCase()"
						class="!rounded"
						size="lg" />
					<div class="flex flex-col text-base/5">
						<label class="font-bold capitalize">{{ seminar.name }}</label>
						<span class="dark:text-gray-400 text-xs">{{
							formatMonthYear(seminar.date as ExperienceDate)
						}}</span>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center items-center p-8"
				v-else>
				<UButton
					icon="i-heroicons-plus"
					size="sm"
					@click="
						modal.open(AlumniAddSeminar, {
							onClose: modal.close,
							uid: alumni?.uid,
						})
					"
					label="Add seminar/training"
					variant="soft" />
			</div>
		</div>
	</div>
</template>
