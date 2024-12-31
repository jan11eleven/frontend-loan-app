import BackendApiBuilder from "../../utils/BackendApiBuilder";
import CreateLoanType from "@/app/types/CreateLoanType";

async function createLoan(loanForm: CreateLoanType) {
	try {
		const response = await fetch(`${BackendApiBuilder}/loan`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(loanForm),
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

export default createLoan;
