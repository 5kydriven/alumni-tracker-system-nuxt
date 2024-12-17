declare global {
	interface Alumni {
		id: number;
		name: string;
		email: string;
		course: string;
		batch: number;
		status: AlumniStatus;
	}

	type AlumniStatus = 'employed' | 'unemployed' | 'unknown';
}

export { Alumni, AlumniStatus };
