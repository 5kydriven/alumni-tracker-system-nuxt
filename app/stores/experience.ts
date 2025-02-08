export const useExperienceStore = defineStore('experienceStore', () => {
	//state
	const workExperiences = ref<WorkExperience[]>();

	//actions
	function addExperience(experience: WorkExperience) {
		workExperiences.value?.push(experience);
	}

	function removeExperience(index: number) {
		workExperiences.value?.splice(index, 1);
	}

	return {
		workExperiences,
		addExperience,
		removeExperience,
	};
});
