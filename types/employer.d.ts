import type { Chats } from './chats';
import type { Job } from './job';

export interface Employer {
	id?: string;
	uid?: string;
	name?: string;
	email?: string;
	role?: Roles;
	userCredentials?: EmployerCredentials;
	jobs?: Job;
	chats?: Chats;
	password?: string;
}
