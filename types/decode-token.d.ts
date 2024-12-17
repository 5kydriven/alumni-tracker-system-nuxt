export interface DecodedToken {
	uid: string;
	iss: string;
	aud: string;
	authTime: number;
	userId: string;
	sub: string;
	iat: number;
	exp: number;
	email: string;
	emailVerified: boolean;
	role?: string;
	firebase: {
		identities: {
			[key: string]: any;
		};

		sign_in_provider: string;

		sign_in_second_factor?: string;

		second_factor_identifier?: string;

		tenant?: string;
		[key: string]: any;
	};
}
