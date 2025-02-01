import BackendApiBuilder from "../../utils/BackendApiBuilder";
import GetLoansType from "@/app/types/GetLoansType";

async function approveLoan(loanDetails: GetLoansType) {
	try {
		const response = await fetch(
			`${BackendApiBuilder}/loan/approve/${loanDetails.loan_reference_id}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(loanDetails),
			}
		);

		if (!response.ok) {
			throw new Error(`Approve Loan Error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Approve Loan API Error", error);

		return error;
	}
}

export default approveLoan;
