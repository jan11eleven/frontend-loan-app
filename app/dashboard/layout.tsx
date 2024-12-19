"use client";

import { useEffect, useState } from "react";
import AuthenticateType from "../types/AuthenticateType";
import { useRouter } from "next/navigation";
import GoogleAccountType from "../types/GoogleAccountType";
import AuthenticateUser from "../apis/auth/AuthenticateUser";
import fetchOneUser from "../apis/users/fetchOneUser";
import BackendUrl from "../utils/BackendUrlBuilder";
import UserType from "../types/UserType";
import { FetchOneUserResponseType } from "../types/FetchUserResponseType";
import CreateLoanProduct from "./create-loan/CreateLoanProduct";
import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/dashboard/app-sidebar";
import { LogOut } from "lucide-react";
import React, { createContext, useContext } from "react";

interface LayoutContextType {
	accountData: GoogleAccountType | null;
}

const defaultLayoutContext: LayoutContextType = {
	accountData: null,
};

const LayoutContext = createContext<LayoutContextType>(defaultLayoutContext);

export const useLayout = () => useContext(LayoutContext);

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);
	const [accountData, setAccountData] = useState<GoogleAccountType | null>(
		null
	);
	const [userData, setUserData] = useState<UserType | null>(null);

	const router = useRouter();

	const logoutButtonHandler = async (): Promise<AuthenticateType | null> => {
		try {
			const response = await fetch(`${BackendUrl}/logout`, {
				method: "GET",
				credentials: "include", // Important: Include credentials with the request
			});

			if (!response.ok) {
				throw new Error(`Logout error! Status: ${response.status}`);
			}

			const result: AuthenticateType = await response.json();

			setIsAuthenticated(result.isAuthenticated);

			return result;
		} catch (error) {
			console.error("There was an error with the authentication:", error);

			return null;
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const result = await AuthenticateUser();

			if (result) {
				setIsAuthenticated(result.isAuthenticated);
				setAccountData(result.userData);
			} else {
				setIsAuthenticated(false);
				setAccountData(null);
			}
		};

		checkAuth();
	}, []);

	useEffect(() => {
		const getOneUser = async () => {
			if (!accountData) return;

			const result: FetchOneUserResponseType | null = await fetchOneUser(
				accountData?.user_id
			);

			if (result && result.status === 200) {
				setUserData(result.userData);
			}
		};

		getOneUser();
	}, [accountData]);

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/"); // Redirect to the homepage if not authenticated
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated === null) {
		return <>Loading...</>;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
					<div
						className="flex
					"
					>
						<SidebarTrigger />
						<h1 className="text-xl ml-4">{accountData?.display_name}</h1>
					</div>
					<button onClick={logoutButtonHandler} className="flex">
						{" "}
						<LogOut className="mr-2" />
						Logout
					</button>
				</header>

				<div className="flex flex-1 flex-col gap-4">
					{userData?.is_activated ? (
						<LayoutContext.Provider value={{ accountData }}>
							<div className="h-full flex justify-center items-center">
								{children}
							</div>
						</LayoutContext.Provider>
					) : (
						"Your account is not activated yet. Please contact the admin to request for activation."
					)}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}