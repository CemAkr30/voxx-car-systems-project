export type User = {
	userId: string;
	username: string;
	name: string;
	email: string;
	roles: string[];
	sessionId: string;
	expirationTime: Date;
};
