export const useExperienceStore = defineStore('experienceStore', () => {
	//state
	const workExperience = ref<Experience[]>([]);
	const skills = ref([]);

	//actions
	function addExperience(experience: Experience) {
		workExperience.value.push(experience);
	}

	return {
		workExperience,
		addExperience,
	};
});
