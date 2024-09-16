import { FetchOneUserResponseType } from "../../types/FetchUserResponseType";
import BackendApiBuilder from "../../utils/BackendApiBuilder";

export default async function fetchOneUser(
	userId: number | null
): Promise<FetchOneUserResponseType | null> {
	try {
		if (!userId) return null;

		const response = await fetch(`${BackendApiBuilder}/users/${userId}`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error(`Fetch One User Error! Status: ${response.status}`);
		}

		const result: FetchOneUserResponseType = await response.json();

		return result;
	} catch (error) {
		console.error("There is an error fetching all users:", error);

		return null;
	}
}
