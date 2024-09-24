type CreateLoanProductType = {
	userId: number | undefined;
	loanProductName: string;
	loanAmount: number | string;
	term: number | string;
	interestRate: number | string;
	postDate: number | string;
};

export default CreateLoanProductType;
