import type { Chats } from './chats';
import type { Job } from './job';

export interface Employer {
	id?: string;
	uid?: string;
	name?: string;
	email?: string;
	role?: Roles;
	companyName?: string;
	companyAddress?: string;
	website?: string;
	telephoneNumber?: number;
	numberBranches?: number;
	numberEmployees?: number;
	field?: string;
	description?: string;
	logo?: File;
	bussinessPermit?: File;
	position?: string;
	contactNumber?: string;
	jobs?: Job;
	chats?: Chats;
	password?: string;
}
