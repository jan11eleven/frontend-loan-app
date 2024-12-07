// validates an amount between 0 and 100,000,000 with up to 2 decimal places:
export const loanAmountRegex =
	/^(?:100000000(?:\.00?)?|(?:\d{1,8})(?:\.\d{1,2})?)$/;

// only accepts numbers between 1 and 60:
export const termRegex = /^(?:[1-9]|[1-5][0-9]|60)$/;

// allows numbers between 0.01 and 999.99, but with 1 or 2 decimal places:
export const interestRateRegex =
	/^(?:0?\.[0-9][1-9]?|[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?)$/;

// allows number from 0 - 31
export const postDateRegex = /^(0|[1-9]|[12][0-9]|3[01])$/;

// only accepts letters and spaces
export const acceptLettersOnlyRegex = /^[A-Za-z ]+$/;

// date regex format yyyy-mm-dd
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// email regex
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// pattern that matches a string with exactly 12 digits in the format "639#########"
export const phoneNumberRegex = /^639\d{9}$/;

// validate monetary amounts without any currency symbols - 10,000.00 or no decimal
export const amountRegex = /^(?!0\d)(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/;
