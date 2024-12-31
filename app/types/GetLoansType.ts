import LoanStatusEnum from "./LoanStatusEnum";

type GetLoansType = {
	loan_reference_id: string;
	user_id: number | undefined;
	loanee_full_name: string;
	loan_amount: string;
	interest_rate: number | string;
	term: number | string;
	loan_status: LoanStatusEnum;
	start_date: string | undefined;
	end_date: string | undefined;
	created_on: string | undefined;
	updated_on: string | undefined;
};

export default GetLoansType;
