"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
	acceptLettersOnlyRegex,
	dateRegex,
	emailRegex,
	phoneNumberRegex,
	amountRegex,
} from "@/app/utils/Regex";
import createLoaneeApi from "@/app/apis/loanee/createLoaneeApi";
import CreateLoaneeType from "@/app/types/CreateLoaneeType";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/hooks/use-toast";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function CreateLoanee({
	userId,
}: {
	userId: number | undefined;
}) {
	const LoanFormDataValidationSchema = z.object({
		firstName: z.string().regex(acceptLettersOnlyRegex).max(200).min(1),
		middleName: z.string().regex(acceptLettersOnlyRegex).max(200).min(1),
		lastName: z.string().regex(acceptLettersOnlyRegex).max(200).min(1),
		dateOfBirth: z.date(),
		emailAddress: z.string().regex(emailRegex).max(200).min(1),
		phoneNumber: z.string().regex(phoneNumberRegex),
		address: z.string().max(200).min(1),
		employerName: z.string().max(200).min(1),
		annualIncome: z.string().regex(amountRegex).max(200).min(1),
		employmentStatus: z.string().max(200).min(1),
		bankAccountNumber: z.string().max(200).min(1),
		idType: z.string().max(200).min(1),
		idNumber: z.string().max(200).min(1),
		issueDate: z.date(),
		expiryDate: z.date(),
	});

	const loaneeForm = useForm<z.infer<typeof LoanFormDataValidationSchema>>({
		resolver: zodResolver(LoanFormDataValidationSchema),
		defaultValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			dateOfBirth: new Date(),
			emailAddress: "",
			phoneNumber: "",
			address: "",
			employerName: "",
			annualIncome: "",
			employmentStatus: "",
			bankAccountNumber: "",
			idType: "",
			idNumber: "",
			issueDate: new Date(),
			expiryDate: new Date(),
		},
	});

	async function onSubmit(
		values: z.infer<typeof LoanFormDataValidationSchema>
	) {
		const transformedData = {
			...values,
			userId: userId,
			annualIncome: Number(values.annualIncome),
			dateOfBirth: format(values.dateOfBirth, "yyyy-MM-dd"),
			issueDate: format(values.issueDate, "yyyy-MM-dd"),
			expiryDate: format(values.expiryDate, "yyyy-MM-dd"),
		};

		console.log(transformedData);

		const result = await createLoaneeApi(transformedData);

		if (result.error) {
			toast({
				variant: "destructive",
				description: "Error encountered: " + result.error,
			});

			return result;
		}

		toast({
			description: "New Loanee successfully created.",
		});

		loaneeForm.reset();
		return result;
	}

	return (
		<div>
			<Form {...loaneeForm}>
				<form
					onSubmit={loaneeForm.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={loaneeForm.control}
						name="firstName"
						render={({ field }: any) => (
							<FormItem>
								<h1 className="font-bold mt-4">Personal Info</h1>
								<hr></hr>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="middleName"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Middle Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="lastName"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of Birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={new Date(field.value)}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											captionLayout="dropdown"
											initialFocus
											showOutsideDays // Show days from the previous/next month
											fromYear={1900} // Allow years starting from 1900
											toYear={new Date().getFullYear()} // Allow up to the current year
											classNames={{
												caption_label: "hidden",
												caption: "justify-start pl-2",
											}}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="emailAddress"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="phoneNumber"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="address"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="employerName"
						render={({ field }: any) => (
							<FormItem>
								<h1 className="font-bold mt-4">Financial Info</h1>
								<hr></hr>
								<FormLabel>Employer Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="annualIncome"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Annual Income</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="employmentStatus"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Employment Status</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="bankAccountNumber"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>Bank Account Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={loaneeForm.control}
						name="idType"
						render={({ field }: any) => (
							<FormItem>
								<h1 className="font-bold">Identification</h1>
								<hr></hr>
								<FormLabel>ID Type</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="idNumber"
						render={({ field }: any) => (
							<FormItem>
								<FormLabel>ID Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="issueDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Issue Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={new Date(field.value)}
											onSelect={field.onChange}
											disabled={(date) => date < new Date("1900-01-01")}
											captionLayout="dropdown"
											initialFocus
											showOutsideDays // Show days from the previous/next month
											fromYear={1900} // Allow years starting from 1900
											toYear={new Date().getFullYear() + 100} // Allow up to the current year
											classNames={{
												caption_label: "hidden",
												caption: "justify-start pl-2",
											}}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={loaneeForm.control}
						name="expiryDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Expiry Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={new Date(field.value)}
											onSelect={field.onChange}
											disabled={(date) => date < new Date("1900-01-01")}
											captionLayout="dropdown"
											initialFocus
											showOutsideDays // Show days from the previous/next month
											fromYear={1900} // Allow years starting from 1900
											toYear={new Date().getFullYear() + 100} // Allow up to the current year
											classNames={{
												caption_label: "hidden",
												caption: "justify-start pl-2",
											}}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
