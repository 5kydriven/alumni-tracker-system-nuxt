export default function useComposableToast() {
	const toast = useToast();

	function toastResponse(res: H3Response) {
		if (res.statusCode == 200) {
			toast.add({
				title: res.statusMessage ?? '',
				description: res.message,
				icon: 'i-heroicons-check-circle',
			});
		} else {
			toast.add({
				title: res.statusMessage ?? '',
				description: res.message,
				color: 'red',
				icon: 'i-heroicons-exclamation-circle',
			});
		}
	}

	return {
		toastResponse,
	};
}
