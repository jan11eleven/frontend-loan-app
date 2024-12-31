import BackendApiBuilder from "../../utils/BackendApiBuilder";

async function searchLoansByUserId(
	page: Number,
	perPage: Number,
	user_id: Number | undefined,
	search_text: String | undefined
) {
	try {
		const response = await fetch(
			`${BackendApiBuilder}/loans/search?page=${page}&perpage=${perPage}&user_id=${user_id}&search_text=${search_text}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);

		if (!response.ok) {
			throw new Error(`Get Loans Error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Get Loans API Error", error);

		return error;
	}
}

export default searchLoansByUserId;
