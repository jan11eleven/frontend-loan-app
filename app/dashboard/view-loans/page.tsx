"use client";

// Shadcn Imports
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// React Imports
import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { useLayout } from "../layout";

// Types import
import GetLoansType from "@/app/types/GetLoansType";

// functions imports
import getLoansByUserId from "@/app/apis/loan/getLoansByUserId";
import searchLoansByUserId from "@/app/apis/loan/searchLoansByUserId";

// utils imports
import { format } from "date-fns";

// lucide icons
import {
	ThumbsUp,
	ThumbsDown,
	Pen,
	Ellipsis,
	EllipsisIcon,
} from "lucide-react";

export default function ViewLoans() {
	const [loansData, setLoansData] = useState<GetLoansType[]>([]);
	const [totalLoanDataRows, setTotalLoanDataRows] = useState(0);
	const [page, setPage] = useState(1);
	const [searchText, setSearchText] = useState("");

	const perPage = 10;
	const { accountData } = useLayout();

	const callGetLoansApi = async () => {
		try {
			const fetchLoansApiResult = await getLoansByUserId(
				page,
				perPage,
				accountData?.user_id
			);

			if (fetchLoansApiResult.error) {
				console.error(fetchLoansApiResult.error);
			}

			setLoansData(fetchLoansApiResult.loanData);
			setTotalLoanDataRows(fetchLoansApiResult.totalLoanDataRows);
		} catch (error) {}
	};

	const callSearchLoansApi = async () => {
		try {
			searchLoansByUserId;
			const fetchLoansApiResult = await searchLoansByUserId(
				page,
				perPage,
				accountData?.user_id,
				searchText
			);

			console.log(fetchLoansApiResult);

			if (fetchLoansApiResult.error) {
				console.error(fetchLoansApiResult.error);
			}

			setLoansData(fetchLoansApiResult.loanData);
			setTotalLoanDataRows(fetchLoansApiResult.totalLoanDataRows);
		} catch (error) {}
	};

	const hidePaginationItemClassName =
		perPage >= totalLoanDataRows ? "hidden" : "";

	useEffect(() => {
		callGetLoansApi();
	}, []);

	useEffect(() => {
		callGetLoansApi();
	}, [page]);

	function handleSearchInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(e.target.value);
	}

	function handleSubmitSearchInputOnClick(
		e: React.MouseEvent<HTMLButtonElement>
	) {
		callSearchLoansApi();
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			callSearchLoansApi();
		}
	}

	useEffect(() => {
		console.log(searchText);
	}, [searchText]);

	return (
		<main className="py-8 mx-16">
			<div className="flex">
				<div className="flex flex-1 w-full max-w-sm items-center space-x-2">
					<Input
						placeholder="Search Loan Reference ID/Name"
						onChange={handleSearchInputOnChange}
						onKeyDown={handleKeyDown}
					/>
					<Button type="submit" onClick={handleSubmitSearchInputOnClick}>
						Search
					</Button>
				</div>

				<div className="flex-1"></div>
				<div className="flex-1"></div>
			</div>
			<div className="border-2 rounded-lg mt-4">
				<Table>
					<TableCaption> Total Loans: {totalLoanDataRows}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Actions</TableHead>
							<TableHead>Loan Reference ID</TableHead>
							<TableHead>Loanee</TableHead>
							<TableHead className="text-right">Loan Amount</TableHead>
							<TableHead className="text-right">Interest Rate</TableHead>
							<TableHead className="text-right">Term</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-center">Start Date</TableHead>
							<TableHead className="text-center">End Date</TableHead>
							<TableHead className="text-center">Created On</TableHead>
							{/* <TableHead className="text-center">Updated On</TableHead> */}
						</TableRow>
					</TableHeader>
					<TableBody>
						{loansData ? (
							loansData.map((loan) => (
								<TableRow key={loan.loan_reference_id}>
									<TableCell className="text-center">
										{/* <Button variant="outline">
											<Pen />
										</Button>
										<Button variant="outline">
											<ThumbsUp className="text-green-500" />
										</Button>
										<Button variant="outline">
											<ThumbsDown className="text-red-600" />
										</Button> */}
										<DropdownMenu>
											<DropdownMenuTrigger>
												<EllipsisIcon />
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>
													{loan.loan_reference_id}
												</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													<Pen /> Edit
												</DropdownMenuItem>
												<DropdownMenuItem>
													<ThumbsUp /> Approve
												</DropdownMenuItem>
												<DropdownMenuItem>
													<ThumbsDown />
													Reject
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
									<TableCell className="min-w-[200px]">
										{loan.loan_reference_id}
									</TableCell>
									<TableCell className="min-w-[150px]">
										{loan.loanee_full_name}
									</TableCell>
									<TableCell className="text-right">
										{loan.loan_amount
											? new Intl.NumberFormat("en-PH", {
													style: "currency",
													currency: "PHP",
											  }).format(parseFloat(loan.loan_amount))
											: "N/A"}
									</TableCell>
									<TableCell className="text-right">
										{loan.interest_rate}
									</TableCell>
									<TableCell className="text-right">{loan.term}</TableCell>
									<TableCell className="font-bold">
										{loan.loan_status}
									</TableCell>
									<TableCell className="text-center">
										{loan.start_date
											? format(new Date(loan.start_date), "MMMM dd, yyyy h:mma")
											: "N/A"}
									</TableCell>
									<TableCell className="text-center">
										{loan.end_date
											? format(new Date(loan.end_date), "MMMM dd, yyyy h:mma")
											: "N/A"}
									</TableCell>
									<TableCell className="text-center">
										{loan.created_on
											? format(new Date(loan.created_on), "MMMM dd, yyyy h:mma")
											: "N/A"}
									</TableCell>
									{/* <TableCell className="text-center">
										{loan.updated_on
											? format(new Date(loan.updated_on), "MMMM dd, yyyy h:mma")
											: "N/A"}
									</TableCell> */}
								</TableRow>
							))
						) : (
							<TableRow></TableRow>
						)}
					</TableBody>
				</Table>
				<Pagination className="my-4">
					<PaginationContent>
						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationPrevious
								className="cursor-pointer"
								onClick={() =>
									setPage((oldPage) => (oldPage == 1 ? 1 : oldPage - 1))
								}
								aria-disabled={page == 0}
							/>
						</PaginationItem>
						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationLink
								onClick={() => {
									setPage(1);
								}}
							>
								{1}
							</PaginationLink>
						</PaginationItem>

						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationLink className="border-2 text-black" href="#">
								{page.toString()}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationEllipsis />
						</PaginationItem>

						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationLink
								onClick={() => {
									setPage(perPage);
								}}
							>
								{Math.ceil(totalLoanDataRows / perPage)}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem className={hidePaginationItemClassName}>
							<PaginationNext
								className="cursor-pointer"
								onClick={() =>
									setPage((oldPage) => {
										const totalPages = Math.ceil(totalLoanDataRows / perPage); // Calculate total pages
										return oldPage < totalPages ? oldPage + 1 : oldPage; // Increment only if not on the last page
									})
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</main>
	);
}
