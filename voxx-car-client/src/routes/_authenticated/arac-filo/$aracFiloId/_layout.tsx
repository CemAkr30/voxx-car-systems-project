import { getAracFiloQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Car, FileText } from "lucide-react";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout",
)({
	beforeLoad: ({ context: { queryClient }, params: { aracFiloId } }) => {
		queryClient.ensureQueryData(getAracFiloQueryOptions(aracFiloId));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { aracFiloId } = Route.useParams();
	const { data: aracFilo } = useSuspenseQuery(
		getAracFiloQueryOptions(aracFiloId),
	);
	return (
		<div className="space-y-3">
			<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
				<div className="absolute inset-0 bg-black/10" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
				<div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />

				<div className="relative p-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-4">
								<div className="p-3 bg-white/20 rounded-2xl">
									<Car className="h-8 w-8 text-white" />
								</div>
								<div>
									<h1 className="text-3xl font-bold text-white">
										Araç Detayları
									</h1>
									<p className="text-white/80 text-lg">
										Plaka: {aracFilo.plaka} • Kiralayan Firma ID: #
										{aracFilo.kiralayanFirmaId}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
				<div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02] cursor-pointer">
					<div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
					<div className="relative p-6">
						<div className="flex items-start justify-between mb-4">
							<div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 group-hover:scale-110 transition-transform duration-300">
								<Car className="h-7 w-7 text-red-600 dark:text-red-400" />
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
								<span className="text-xs font-medium text-red-600 dark:text-red-400">
									AKTİF
								</span>
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
								GENEL
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
								Araç genel bilgileri ve temel detaylar
							</p>
						</div>
						<div className="mt-4 flex items-center gap-2">
							<div className="flex -space-x-2">
								<div className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
									<span className="text-xs font-bold text-red-600 dark:text-red-400">
										G
									</span>
								</div>
							</div>
							<span className="text-xs text-slate-500 dark:text-slate-400">
								Aktif Sekme
							</span>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-100 transition-transform duration-300 origin-left" />
				</div>
				<div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02] cursor-pointer">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
					<div className="relative p-6">
						<div className="flex items-start justify-between mb-4">
							<div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 group-hover:scale-110 transition-transform duration-300">
								<FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
							</div>
							<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
						</div>
						<div className="space-y-2">
							<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
								SİGORTA
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
								Sigorta bilgileri ve poliçe detayları
							</p>
						</div>
						<div className="mt-4 flex items-center gap-2">
							<div className="flex -space-x-2">
								<div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
									<span className="text-xs font-bold text-blue-600 dark:text-blue-400">
										S
									</span>
								</div>
							</div>
							<span className="text-xs text-slate-500 dark:text-slate-400">
								Sigorta Modülü
							</span>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
				</div>
				<div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02] cursor-pointer">
					<div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
					<div className="relative p-6">
						<div className="flex items-start justify-between mb-4">
							<div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20 group-hover:scale-110 transition-transform duration-300">
								<Calendar className="h-7 w-7 text-green-600 dark:text-green-400" />
							</div>
							<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
						</div>
						<div className="space-y-2">
							<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
								MTV BİLGİLERİ
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
								Motorlu taşıtlar vergisi ve muayene bilgileri
							</p>
						</div>
						<div className="mt-4 flex items-center gap-2">
							<div className="flex -space-x-2">
								<div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
									<span className="text-xs font-bold text-green-600 dark:text-green-400">
										M
									</span>
								</div>
							</div>
							<span className="text-xs text-slate-500 dark:text-slate-400">
								MTV Modülü
							</span>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
				</div>
			</div>
			<Outlet />
		</div>
	);
}
