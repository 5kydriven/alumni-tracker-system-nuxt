export default function useComposableToast() {
	const toast = useToast();

	function toastSuccess(message: string) {
		toast.add({
			title: 'Success',
			description: message,
			icon: 'i-heroicons-check-circle',
		});
	}

	function toastError(message: string) {
		toast.add({
			title: 'Error',
			description: message,
			color: 'red',
			icon: 'i-heroicons-exclamation-circle',
		});
	}

	return {
		toastError,
		toastSuccess,
	};
}
