"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackendUrl from "./utils/BackendUrlBuilder";
import AuthenticateUser from "./apis/auth/AuthenticateUser";

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
	}, [isAuthenticated, router]);

	if (isAuthenticated === null) {
		return <>Loading...</>;
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
