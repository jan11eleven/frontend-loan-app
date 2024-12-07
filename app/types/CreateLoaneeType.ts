type CreateLoaneeType = {
	userId: number | undefined;
	firstName: string | undefined;
	middleName: string | undefined;
	lastName: string | undefined;
	dateOfBirth: string | undefined | Date;
	emailAddress: string | undefined;
	phoneNumber: string | undefined;
	address: string | undefined;
	employerName: string | undefined;
	annualIncome: string | number | undefined;
	employmentStatus: string | undefined;
	bankAccountNumber: string | undefined;
	idType: string | undefined;
	idNumber: string | undefined;
	issueDate: string | undefined | Date;
	expiryDate: string | undefined | Date;
};

export default CreateLoaneeType;
