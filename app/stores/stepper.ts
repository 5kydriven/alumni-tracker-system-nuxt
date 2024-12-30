export const useStepperStore = defineStore('stepperStore', () => {
	const form = reactive<Alumni>({});

	function updateAlumni(uid: string) {}

	return {
		form,
	};
});
