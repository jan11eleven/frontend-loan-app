"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
	loanAmountRegex,
	termRegex,
	interestRateRegex,
} from "../../utils/Regex";
import createLoan from "@/app/apis/loan/createLoan";
import LoanStatusEnum from "@/app/types/LoanStatusEnum";
import fetchLoaneeByUserId from "@/app/apis/loanee/fetchLoaneeByUserId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
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
import { RotateCw } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreateLoanee from "../create-loanee/CreateLoanee";
import { useLayout } from "../layout";

type LoaneeDetailsType = {
	id: number;
	first_name: string;
	last_name: string;
}[];

export default function CreateLoanProduct() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { accountData } = useLayout();
	const userId: number | undefined = accountData?.user_id;
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
			description: "Loan successfully submitted.",
		});
		loanProductForm.reset();
		return result;
	}

	async function callFetchLoaneeDetailsApi() {
		const result = await fetchLoaneeByUserId(
			userId,
			"?fields=id,first_name,last_name"
		);

		if (result.error) {
			toast({
				variant: "destructive",
				description: "Error encountered: " + result.error,
			});
			return result;
		}

		setLoaneeDetails(result.loaneeData);
		toast({
			description: "Loanees have been refreshed.",
		});
	}

	useEffect(() => {
		callFetchLoaneeDetailsApi();
	}, []);

	return (
		<div className="py-8 px-16 border-2 rounded-lg w-5/6">
			<h1 className="font-bold text-2xl mb-8">Create Loan</h1>

			<Dialog>
				<DialogTrigger className="border-2 py-1 px-2 rounded-md mb-4">
					Create Loanee
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] md:max-w-[725px] max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Create Loanee</DialogTitle>
						<DialogDescription>Create your new Loanee here.</DialogDescription>
					</DialogHeader>
					<CreateLoanee userId={userId} />
				</DialogContent>
			</Dialog>

			{/* Loan Product Form */}
			<Form {...loanProductForm}>
				<form
					onSubmit={(e) => {
						e.preventDefault(); // Prevent default form submission
						setIsDialogOpen(true); // Open the confirmation dialog
					}}
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
								<Button
									variant="outline"
									size="icon"
									type="button"
									onClick={callFetchLoaneeDetailsApi}
								>
									<RotateCw />
								</Button>
							</FormItem>
						)}
					/>
					<FormField
						control={loanProductForm.control}
						name="loanAmount"
						render={({ field }) => (
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
						render={({ field }) => (
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
						render={({ field }) => (
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

			{/* Confirmation Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[425px] md:max-w-[725px] max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Confirm Submission</DialogTitle>
						<DialogDescription>
							Are you sure you want to submit?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={() => {
								loanProductForm.handleSubmit(OnSubmit)();
								setIsDialogOpen(false);
							}}
						>
							Confirm
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
