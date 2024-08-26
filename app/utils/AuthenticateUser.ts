import AuthenticateType from "../types/AuthenticateType";
import BackendUrl from "./BackendUrlBuilder";

const AuthenticateUser = async (): Promise<AuthenticateType | null> => {
	try {
		const response = await fetch(`${BackendUrl}/dashboard`, {
			method: "GET",
			credentials: "include", // Important: Include credentials with the request
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result: AuthenticateType = await response.json();

		return result;
	} catch (error) {
		console.error("There was an error with the authentication:", error);

		return null;
	}
};

export default AuthenticateUser;
