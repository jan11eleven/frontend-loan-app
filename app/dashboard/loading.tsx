import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex w-full justify-center text-xl">
			<Loader2 className="mr-1 h-6 w-6 animate-spin" /> Please wait
		</div>
	);
}
