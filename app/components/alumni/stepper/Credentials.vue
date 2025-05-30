<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	const store = useStepperStore();

	const maritalStatus = [
		'single',
		'married',
		'divorced',
		'widowed',
		'separated',
		'engaged',
		'other',
	];

	const props = defineProps<{ name: string }>();

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const input = target.value;
		target.value = input.replace(/\D/g, '');
		if (store.form.userCredentials) {
			store.form.userCredentials.phoneNumber = target.value;
		}
	};

	const selectedProvince: any = computed(
		() => (store.form.userCredentials as AlumniCredentials).province,
	);

	const { data: provinces, status: provinceStatus } =
		useLazyFetch<any>('/api/provinces');

	const cities = ref<any[]>([]);

	watch(
		selectedProvince,
		async (province) => {
			if (province?.code) {
				const data = await $fetch<any>(`/api/provinces/${province.code}`);
				cities.value = data;
				console.log(province?.code);
			}
		},
		{
			immediate: true,
			deep: true,
		},
	);
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-2 w-full">
				<UFormGroup label="Full Name">
					<UInput
						placeholder="John Doe"
						type="text"
						disabled
						v-model="props.name"
						:ui="{ form: 'capitalize' }" />
				</UFormGroup>
			</div>
		</div>
		<div class="grid grid-cols-12 gap-2">
			<UFormGroup
				label="Phone number"
				class="col-span-6"
				required>
				<UInput
					placeholder="ex. 09385254044"
					type="text"
					trim
					minLength="11"
					maxLength="11"
					required
					v-model="(store.form.userCredentials as AlumniCredentials).phoneNumber"
					@input="onInput">
					<template #leading>
						<span class="text-gray-500 dark:text-gray-400 text-xs">+63</span>
					</template>
				</UInput>
			</UFormGroup>
			<UFormGroup
				label="Province"
				class="col-span-6"
				required>
				<USelectMenu
					:loading="provinceStatus != 'success'"
					v-model="(store.form.userCredentials as AlumniCredentials).province"
					:options="provinces"
					optionAttribute="name"
					placeholder="Select province" />
			</UFormGroup>
			<UFormGroup
				label="Zip Code"
				class="col-span-6"
				required>
				<UInput
					placeholder="ex. 6127"
					type="text"
					v-model="(store.form.userCredentials as AlumniCredentials).zipCode" />
			</UFormGroup>
			<UFormGroup
				label="City"
				class="col-span-6"
				required>
				<USelectMenu
					:disabled="!selectedProvince"
					:options="cities"
					optionAttribute="name"
					v-model="(store.form.userCredentials as AlumniCredentials).city"
					placeholder="Select city" />
			</UFormGroup>
			<UFormGroup
				label="Date of birth"
				class="col-span-6"
				required>
				<VueDatePicker
					:enable-time-picker="false"
					auto-apply
					v-model="(store.form.userCredentials as AlumniCredentials).birthDate" />
			</UFormGroup>
			<UFormGroup
				label="Place of birth"
				class="col-span-6"
				required>
				<UInput
					placeholder="ex. San Carlos City"
					type="text"
					v-model="(store.form.userCredentials as AlumniCredentials).birthPlace" />
			</UFormGroup>
			<UFormGroup
				label="Gender"
				class="col-span-6"
				required>
				<USelectMenu
					placeholder="Select gender"
					v-model="(store.form.userCredentials as AlumniCredentials).gender"
					:options="['male', 'female']" />
			</UFormGroup>
			<UFormGroup
				label="Marital status"
				class="col-span-6"
				required>
				<USelectMenu
					v-model="(store.form.userCredentials as AlumniCredentials).maritalStatus"
					placeholder="Select status"
					:options="maritalStatus" />
			</UFormGroup>
		</div>
	</div>
</template>
