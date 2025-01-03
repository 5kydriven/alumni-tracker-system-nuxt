export default function errorResponse(error: any) {
	return {
		statusCode: error.statusCode || 400,
		statusMessage: error.statusMessage || 'Something went wrong',
		message: error.message,
	};
}
