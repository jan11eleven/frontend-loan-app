"use client";
import { useRouter } from "next/navigation";
import { useLayout } from "./layout";

export default function Dashboard() {
	const { isAuthenticated } = useLayout();
	const router = useRouter();

	console.log(isAuthenticated);
	if (!isAuthenticated) {
		router.push("/");
	}

	return <div>Dashboard</div>;
}
