import UserType from "./UserType";

export type FetchAllUserResponseType = {
	userData: UserType[];
	message: string;
	status: number;
};

export type FetchOneUserResponseType = {
	userData: UserType;
	message: string;
	status: number;
};
