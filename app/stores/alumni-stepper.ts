export const useStepperStore = defineStore('stepper-store', () => {
	const stepFields: Record<string, string[]> = {
		'alumni-account': ['email', 'password'],
		'alumni-credential': [
			'province',
			'city',
			'zipCode',
			'birthPlace',
			'birthDate',
			'maritalStatus',
			'gender',
		],
	};

	const form = ref<User<AlumniCredentials>>({
		email: '',
		password: '',
		isAgree: false,
		userCredentials: {
			phoneNumber: '',
			province: '',
			city: '',
			zipCode: '',
			birthPlace: '',
			gender: undefined,
			maritalStatus: '',
			birthDate: '',
		},
	});

	const survey = ref<Survey>({
		employmentStatus: undefined,
		employmentType: undefined,
		jobTitle: undefined,
		companyName: undefined,
		companyAddress: undefined,
		yearsInJob: undefined,
		workNature: undefined,
		urlLink: undefined,
		bussinessName: undefined,
		isRegistered: undefined,
		fileUrl: undefined,
	});
	const progress = ref(0);

	function isValidStep(step: string) {
		const fields = stepFields[step];

		return fields?.every((field: string) => {
			if (field in form.value) {
				const value = form.value[field as keyof User<AlumniCredentials>];
				return (
					value && (typeof value === 'string' ? value.trim().length > 0 : true)
				);
			}

			if (form.value.userCredentials) {
				const value =
					form.value.userCredentials[field as keyof AlumniCredentials];
				return (
					value && (typeof value === 'string' ? value.trim().length > 0 : true)
				);
			}

			return false;
		});
	}

	return { form, isValidStep, progress, survey };
});
