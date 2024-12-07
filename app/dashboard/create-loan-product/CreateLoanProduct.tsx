"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
	loanAmountRegex,
	termRegex,
	interestRateRegex,
	postDateRegex,
} from "../../utils/Regex";
import createLoan from "@/app/apis/loan/createLoan";
import CreateLoanType from "@/app/types/CreateLoanType";
import LoanStatusEnum from "@/app/types/LoanStatusEnum";
import fetchLoaneeByUserId from "@/app/apis/loanee/fetchLoaneeByUserId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/components/hooks/use-toast";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreateLoanee from "../create-loanee/CreateLoanee";
import { DialogClose } from "@radix-ui/react-dialog";

type LoaneeDetailsType = {
	id: number;
	first_name: string;
	last_name: string;
}[];

export default function CreateLoanProduct({
	userId,
}: {
	userId: number | undefined;
}) {
	const { toast } = useToast();

	const [loaneeDetails, setLoaneeDetails] = useState<LoaneeDetailsType | null>(
		null
	);

	const LoanProductValidationSchema = z.object({
		loaneeId: z.string(),
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
		loanStatus: z.nativeEnum(LoanStatusEnum),
	});

	const loanProductForm = useForm<z.infer<typeof LoanProductValidationSchema>>({
		resolver: zodResolver(LoanProductValidationSchema),
		defaultValues: {
			loaneeId: "",
			loanAmount: "",
			term: "",
			interestRate: "",
			loanStatus: LoanStatusEnum.PENDING,
		},
	});

	async function OnSubmit(values: z.infer<typeof LoanProductValidationSchema>) {
		const transformedData = {
			...values,
			userId: userId,
			loaneeId: Number(values.loaneeId),
			loanAmount: Number(values.loanAmount),
			interestRate: Number(values.interestRate),
			term: Number(values.term),
			startDate: undefined,
			endDate: undefined,
		};

		const result = await createLoan(transformedData);

		if (result.error) {
			toast({
				variant: "destructive",
				description: "Error encountered: " + result.error,
			});

			return result;
		}

		toast({
			description: "Loan Successfully submitted.",
		});
		loanProductForm.reset();

		return result;
	}

	// fetch loanee details
	useEffect(() => {
		const callFetchLoaneeDetailsApi = async () => {
			const result = await fetchLoaneeByUserId(
				userId,
				"?fields=id,first_name,last_name"
			);

			console.log(result);

			if (result.error) {
				// catch error message and display to interface
				return result;
			}

			setLoaneeDetails(result.loaneeData);
		};

		callFetchLoaneeDetailsApi();
	}, []);

	return (
		<div>
			<Form {...loanProductForm}>
				<form
					onSubmit={loanProductForm.handleSubmit(OnSubmit)}
					className="space-y-8"
				>
					<FormField
						control={loanProductForm.control}
						name="loaneeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Loanee</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select an existing user here" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{loaneeDetails?.map((loanee) => (
											<SelectItem key={loanee.id} value={loanee.id.toString()}>
												{loanee.first_name} {loanee.last_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
								<Dialog>
									<DialogTrigger className="border-2 border- p-2 rounded-md">
										Create Loanee
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px] md:max-w-[725px] max-h-[80vh] overflow-y-auto">
										<DialogHeader>
											<DialogTitle>Create Loanee</DialogTitle>
											<DialogDescription>
												Create your new Loanee here.
											</DialogDescription>
										</DialogHeader>
										<CreateLoanee userId={userId} />
										<DialogClose className="border-2 text-md p-1 rounded-md">
											Close
										</DialogClose>
									</DialogContent>
								</Dialog>
							</FormItem>
						)}
					/>
					<FormField
						control={loanProductForm.control}
						name="loanAmount"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Loan Amount</FormLabel>
								<FormControl>
									<Input placeholder="XXX,XXX,XXX.XX" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loanProductForm.control}
						name="interestRate"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Interest Rate</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loanProductForm.control}
						name="term"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Term (Months)</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
