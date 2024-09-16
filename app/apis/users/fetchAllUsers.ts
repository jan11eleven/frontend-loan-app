import { FetchAllUserResponseType } from "../../types/FetchUserResponseType";
import BackendApiBuilder from "../../utils/BackendApiBuilder";

export default async function fetchAllUsers(): Promise<FetchAllUserResponseType | null> {
	try {
		const response = await fetch(`${BackendApiBuilder}/users`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error(`Fetch All User Error! Status: ${response.status}`);
		}

		const result: FetchAllUserResponseType = await response.json();

		return result;
	} catch (error) {
		console.error("There is an error fetching all users:", error);

		return null;
	}
}
