import GoogleAccountType from "./GoogleAccountType";

type AuthenticateType = {
	isAuthenticated: boolean;
	message: string;
	redirectUrl: string | null;
	userData: GoogleAccountType | null;
};

export default AuthenticateType;
