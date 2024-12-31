import BackendApiBuilder from "../../utils/BackendApiBuilder";

async function getLoansByUserId(
	page: Number,
	perPage: Number,
	user_id: Number | undefined
) {
	try {
		const response = await fetch(
			`${BackendApiBuilder}/loans?page=${page}&perpage=${perPage}&user_id=${user_id}`,
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

export default getLoansByUserId;
