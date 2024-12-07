import BackendApiBuilder from "../../utils/BackendApiBuilder";

async function fetchLoaneeByUserId(
	userId: number | undefined,
	queryParams: string | undefined
) {
	try {
		const response = await fetch(
			`${BackendApiBuilder}/loanee/${userId}${queryParams}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);

		if (!response.ok) {
			throw new Error(`Create Loan Error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Fetch Loanee API Error", error);

		return error;
	}
}

export default fetchLoaneeByUserId;
