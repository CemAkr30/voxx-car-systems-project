interface LoadingOverlayProps {
	isLoading: boolean;
	message?: string;
	subMessage?: string;
}

export default function LoadingOverlay({ 
	isLoading, 
	message = "Veriler Yükleniyor", 
	subMessage = "Lütfen bekleyin..." 
}: LoadingOverlayProps) {
	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl border border-white/20 dark:border-gray-700/20">
				<div className="relative">
					<div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
					<div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse border-t-blue-400 dark:border-t-blue-300 opacity-50"></div>
				</div>
				<div className="text-center">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
						{message}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{subMessage}
					</p>
				</div>
				<div className="flex space-x-1">
					<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
					<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
					<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
				</div>
			</div>
		</div>
	);
}
