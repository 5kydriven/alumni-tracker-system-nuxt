import type { Chats } from './chats';
import type { Job } from './job';

export interface Employer {
	id: string;
	name: string;
	email: string;
	role: string;
	jobs: Job;
	chats: Chats;
}
