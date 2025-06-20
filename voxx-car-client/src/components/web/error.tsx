import { Button } from "@/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { MoveLeft, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage() {
	const router = useRouter();
	const queryErrorResetBoundary = useQueryErrorResetBoundary();

	useEffect(() => {
		queryErrorResetBoundary.reset();
	}, [queryErrorResetBoundary]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-gray-200 transition-colors duration-300">
			<div className="text-center space-y-6 max-w-md">
				<h1 className="text-7xl font-extrabold tracking-widest">
					<span className="sr-only">Error</span>
					<span className="inline-block transition-transform hover:scale-110 duration-300">
						E
					</span>
					<span className="inline-block transition-transform hover:scale-110 duration-300">
						R
					</span>
					<span className="inline-block transition-transform hover:scale-110 duration-300">
						R
					</span>
					<span className="inline-block transition-transform hover:scale-110 duration-300">
						O
					</span>
					<span className="inline-block transition-transform hover:scale-110 duration-300">
						R
					</span>
				</h1>
				<p className="text-xl">Oops! Something went wrong.</p>
				<div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
			</div>

			<div className="mt-8 flex items-center space-x-4">
				<Button
					onClick={() => router.invalidate()}
					className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center group h-10"
				>
					<RotateCcw className="h-4 w-4 mr-2 transition-transform group-hover:-rotate-90" />
					Try Again
				</Button>
				<Link
					to="/"
					className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center group h-10"
				>
					<MoveLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
					Return Home
				</Link>
			</div>

			<div className="mt-12 text-sm text-gray-400">
				<p>If this error persists, please contact our support team.</p>
			</div>
		</div>
	);
}
