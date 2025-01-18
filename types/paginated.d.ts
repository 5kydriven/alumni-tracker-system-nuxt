declare global {
	interface PaginatedResponse<T> {
		data: T[];
		total: number;
	}
}

export { PaginatedResponse };
