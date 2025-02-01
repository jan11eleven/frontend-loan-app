"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackendUrl from "./utils/BackendUrlBuilder";
import AuthenticateUser from "./apis/auth/AuthenticateUser";
import { Loader2 } from "lucide-react";
export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);
	const router = useRouter();

	const signInToGoogleHandler = async () => {
		window.location.href = `${BackendUrl}/auth/google`;
	};

	useEffect(() => {
		const checkAuth = async () => {
			const result = await AuthenticateUser();

			if (result) {
				setIsAuthenticated(result.isAuthenticated);
			} else {
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	useEffect(() => {
		if (isAuthenticated === true) {
			router.push("/dashboard"); // Redirect to the dashboard if authenticated
		}
	}, [isAuthenticated]);

	if (isAuthenticated === null) {
		return (
			<div className="flex h-screen w-screen justify-center items-center text-2xl">
				<Loader2 className="mr-1 h-6 w-6 animate-spin" /> Please wait
			</div>
		);
	}

	return (
		<main className="">
			<div>
				<h1>Sign in</h1>
				<button className="button facebook" onClick={signInToGoogleHandler}>
					Sign in with Google
				</button>
			</div>
		</main>
	);
}
