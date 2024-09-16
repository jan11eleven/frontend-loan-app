type CreateLoanProductType = {
	userId: number;
	loanProductName: string;
	loanAmount: number | string;
	term: number | string;
	interestRate: number | string;
};

export default CreateLoanProductType;
