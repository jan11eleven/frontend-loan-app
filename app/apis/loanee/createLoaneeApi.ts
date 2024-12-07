import BackendApiBuilder from "../../utils/BackendApiBuilder";
import CreateLoaneeType from "@/app/types/CreateLoaneeType";

async function createLoanee(loaneeForm: CreateLoaneeType) {
	try {
		const response = await fetch(`${BackendApiBuilder}/loanee`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(loaneeForm),
		});

		if (!response.ok) {
			throw new Error(`Create Loan Error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Create Loan API Error", error);

		return error;
	}
}

export default createLoanee;
