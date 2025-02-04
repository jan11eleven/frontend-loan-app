import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex h-screen w-screen justify-center items-center text-2xl">
			<Loader2 className="mr-1 h-6 w-6 animate-spin" /> Please wait
		</div>
	);
}
