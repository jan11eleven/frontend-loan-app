// validates an amount between 0 and 100,000,000 with up to 2 decimal places:
export const loanAmountRegex =
	/^(?:100000000(?:\.00?)?|(?:\d{1,8})(?:\.\d{1,2})?)$/;

// only accepts numbers between 1 and 60:
export const termRegex = /^(?:[1-9]|[1-5][0-9]|60)$/;

// allows numbers between 0.01 and 999.99, but with 1 or 2 decimal places:
export const interestRateRegex =
	/^(?:0?\.[0-9][1-9]?|[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?)$/;

export const postDateRegex = /^(0|[1-9]|[12][0-9]|3[01])$/;
