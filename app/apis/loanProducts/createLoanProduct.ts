import BackendApiBuilder from "../../utils/BackendApiBuilder";
import CreateLoanProductType from "@/app/types/CreateLoanProductType";

async function createLoanProduct(loanProductForm: CreateLoanProductType) {
	try {
		const response = await fetch(`${BackendApiBuilder}/loanproducts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(loanProductForm),
		});

		if (!response.ok) {
			throw new Error(`Create Loan Product Error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Create Loan Product API Error", error);

		return error;
	}
}

export default createLoanProduct;
