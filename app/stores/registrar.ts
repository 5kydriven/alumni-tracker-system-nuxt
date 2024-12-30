export const useRegistrarStore = defineStore('registrarStore', () => {
	//state
	const alumni = ref<Alumni[]>([]);
	const isLoading = ref(false);

	//actions
	async function getAlumni() {
		try {
			const res = await $fetch<Alumni[]>('/api/registrar/alumni', {
				method: 'GET',
			});
			alumni.value = res;
			return res;
		} catch (err) {
			console.log(err);
		}
	}

	async function storeAlumni(csv: Alumni[]) {
		isLoading.value = true;
		try {
			const res = await $fetch<H3Response>('/api/registrar/alumni', {
				method: 'POST',
				body: csv,
			});
			alumni.value = alumni.value.concat(res.body);
			console.log(res.body);
			return res;
		} catch (err) {
			console.log(err);
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteAlumni(uid: string) {
		isLoading.value = true;
		const res = await $fetch<H3Response>(`/api/registrar/alumni`, {
			method: 'DELETE',
			body: JSON.stringify(uid),
		});
		console.log(res);
		alumni.value = alumni.value.filter((item) => item.uid !== uid);

		isLoading.value = false;

		return res;
	}

	return {
		alumni,
		isLoading,
		deleteAlumni,
		getAlumni,
		storeAlumni,
	};
});
