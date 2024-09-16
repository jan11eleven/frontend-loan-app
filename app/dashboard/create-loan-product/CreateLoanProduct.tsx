"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
	loanAmountRegex,
	termRegex,
	interestRateRegex,
} from "../../utils/Regex";
import createLoanProduct from "@/app/apis/loanProducts/createLoanProduct";
import CreateLoanProductType from "@/app/types/CreateLoanProductType";

export default function CreateLoanProduct({
	userId,
}: {
	userId: number | undefined;
}) {
	const [formData, setFormData] = useState<CreateLoanProductType>({
		userId: 6,
		loanProductName: "",
		loanAmount: "",
		term: "",
		interestRate: "",
	});

	const LoanProductValidationSchema = z.object({
		loanProductName: z
			.string({
				required_error: "Loan Product Name is required",
				invalid_type_error: "Loan Product Name must be a string",
			})
			.max(62, { message: "Must be 80 or fewer characters long" })
			.min(8, { message: "Must be 8 or more characters long" }),
		loanAmount: z.union([
			z.string().regex(loanAmountRegex, {
				message:
					"Amount must be between 0 and 100,000,000 with up to 2 decimal places",
			}),
			z.number(),
		]),
		term: z.union([
			z
				.string()
				.regex(termRegex, { message: "Term must be numbers between 1 and 60" }),
			z.number(),
		]),
		interestRate: z.union([
			z.string().regex(interestRateRegex, {
				message:
					"Interest Rate must be numbers between 0.01 and 999.99, with 1 or 2 decimal places",
			}),
			z.number(),
		]),
	});

	useEffect(() => {
		LoanProductValidationSchema.safeParse(formData);
	}, [formData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		setFormData({
			...formData,
			[id]: value,
		});
	};

	const callCreateLoanProductApi = async () => {
		const transformedData = {
			...formData,
			loanAmount: Number(formData.loanAmount),
			term: Number(formData.term),
			interestRate: Number(formData.interestRate),
		};

		const result = await createLoanProduct(transformedData);

		if (result.error) {
			// catch error message and display to interface
			return result;
		}

		setFormData({
			...formData,
			loanProductName: "",
			loanAmount: "",
			term: "",
			interestRate: "",
		});
		return result;
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		callCreateLoanProductApi();
	};

	return (
		<div>
			<form action="" onSubmit={handleOnSubmit}>
				<h1>Create Loan Product Page</h1>
				<div>
					<label htmlFor="loanProductName">Loan Product Name: </label>
					<input
						id="loanProductName"
						type="text"
						value={formData.loanProductName}
						className="border-2"
						onChange={handleChange}
					></input>
				</div>
				<div>
					<label htmlFor="loanAmount">Loan Amount: </label>
					<input
						id="loanAmount"
						type="text"
						value={formData.loanAmount}
						className="border-2"
						onChange={handleChange}
					></input>
				</div>
				<div>
					<label htmlFor="term">Term: (Months)</label>
					<input
						id="term"
						type="text"
						value={formData.term}
						className="border-2"
						onChange={handleChange}
					></input>
				</div>
				<div>
					<label htmlFor="interestRate">Interest Rate: </label>
					<input
						id="interestRate"
						type="text"
						value={formData.interestRate}
						className="border-2"
						onChange={handleChange}
					></input>
				</div>
				<button type="submit" className="border-2 p-1">
					Submit
				</button>
			</form>
		</div>
	);
}
