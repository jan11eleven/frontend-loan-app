"use client";

import { useEffect, useState } from "react";
import AuthenticateType from "../types/AuthenticateType";
import { useRouter } from "next/navigation";
import GoogleAccountType from "../types/GoogleAccountType";
import AuthenticateUser from "../utils/AuthenticateUser";
import BackendUrl from "../utils/BackendUrlBuilder";

export default function Dashboard() {
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);
	const [accountData, setAccountData] = useState<GoogleAccountType | null>(
		null
	);
	const router = useRouter();

	const logoutButtonHandler = async (): Promise<AuthenticateType | null> => {
		try {
			const response = await fetch(`${BackendUrl}/logout`, {
				method: "GET",
				credentials: "include", // Important: Include credentials with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
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
		if (isAuthenticated === false) {
			router.push("/"); // Redirect to the homepage if not authenticated
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated === null) {
		return <>Loading...</>;
	}

	return (
		<>
			<main>
				<div className="flex justify-between w-screen bg-red-100 p-4">
					<p>Dashboard Page</p>
					<button onClick={logoutButtonHandler}>Logout</button>
				</div>
				<div className="p-4">
					<p>Welcome, {accountData?.display_name}</p>
				</div>
			</main>
		</>
	);
}
