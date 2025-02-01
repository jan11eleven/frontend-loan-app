import LoanStatusEnum from "./LoanStatusEnum";

type CreateLoanType = {
	userId: number | undefined;
	loaneeId: number | undefined | string;
	loanAmount: number | string;
	interestRate: number | string;
	term: number | string;
	loanStatus: LoanStatusEnum;
	startDate?: string | undefined;
	endDate?: string | undefined;
};

export default CreateLoanType;
