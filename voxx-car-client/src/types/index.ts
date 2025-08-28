export type WebSocketMessage = {
	type: "CREATED" | "UPDATED" | "DELETED";
	id: string;
};
