import useComposableToast from './useToastComposables';

export default function useAlumniForm() {
	const user = useCurrentUser();
	const { toastResponse } = useComposableToast();

	interface FormAlumni {
		email: string;
		password: string;
		phoneNumber: string;
		province: string;
		city: string;
		zipCode: string;
		birthPlace: string;
		birthDate: string;
		maritalStatus: string;
		gender: string;
	}

	const form = reactive({
		email: '',
		password: '',
		phoneNumber: '',
		province: '',
		city: '',
		zipCode: '',
		birthPlace: '',
		birthDate: '',
		maritalStatus: '',
		gender: '',
	});

	const maritalStatus = [
		'single',
		'married',
		'divorced',
		'widowed',
		'separated',
		'engaged',
		'other',
	];

	const isValidStep = (step: string) => {
		const stepFields: Record<string, string[]> = {
			'alumni-account': ['email'],
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

		const fields = stepFields[step];
		return fields?.every((field) => {
			const value = form[field as keyof FormAlumni];
			return (
				value && (typeof value === 'string' ? value.trim().length > 0 : true)
			);
		});
	};

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const input = target.value.replace(/\D/g, '');
		form.phoneNumber = input;
	};

	const onSubmit = async (stepper: any, router: any) => {
		if (stepper.current.value === 'alumni-done') {
			router.push('/alumni');
			return;
		}

		if (stepper.current.value === 'alumni-survey') {
			const res = await $fetch<H3Response>(`/api/alumni/${user.value?.uid}`, {
				method: 'PUT',
				body: JSON.stringify({ ...form }),
			});

			if (res.statusCode === 200) {
				stepper.goTo('alumni-done');
			} else {
				toastResponse(res);
			}
			return;
		}

		stepper.next();
	};

	return { form, maritalStatus, isValidStep, onInput, onSubmit };
}
