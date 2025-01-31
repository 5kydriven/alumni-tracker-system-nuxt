export const useExperienceStore = defineStore('experienceStore', () => {
	//state
	const workExperiences = ref<Experience[]>();

	//actions
	function addExperience(experience: Experience) {
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
