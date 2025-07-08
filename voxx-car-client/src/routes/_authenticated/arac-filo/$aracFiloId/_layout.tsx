import { getAracFiloQueryOptions } from "@/hooks/use-arac-filo-hooks";
import usePath from "@/hooks/use-path";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowLeft,
	Calendar,
	Car,
	Edit,
	FileText,
} from "lucide-react";

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
	const actionButtons = [
		{
			label: "DETAY",
			active: true,
			color: "from-red-500 to-pink-500",
			icon: Car,
			bgColor: "bg-red-50 dark:bg-red-950/20",
			iconColor: "text-red-600 dark:text-red-400",
			to: `/arac-filo/${aracFiloId}/detay`,
		},
		{
			label: "SİGORTA",
			active: false,
			color: "from-blue-500 to-cyan-500",
			icon: FileText,
			bgColor: "bg-blue-50 dark:bg-blue-950/20",
			iconColor: "text-blue-600 dark:text-blue-400",
			to: `/arac-filo/${aracFiloId}/sigorta`,
		},
		{
			label: "MTV",
			active: false,
			color: "from-green-500 to-emerald-500",
			icon: Calendar,
			bgColor: "bg-green-50 dark:bg-green-950/20",
			iconColor: "text-green-600 dark:text-green-400",
			to: `/arac-filo/${aracFiloId}/mtv`,
		},
		{
			label: "MUAYENE",
			active: false,
			color: "from-purple-500 to-violet-500",
			icon: AlertTriangle,
			bgColor: "bg-purple-50 dark:bg-purple-950/20",
			iconColor: "text-purple-600 dark:text-purple-400",
			to: `/arac-filo/${aracFiloId}/muayene`,
		},
		{
			label: "BAKIM",
			active: false,
			color: "from-orange-500 to-amber-500",
			icon: Edit,
			bgColor: "bg-orange-50 dark:bg-orange-950/20",
			iconColor: "text-orange-600 dark:text-orange-400",
			to: `/arac-filo/${aracFiloId}/bakim`,
		},
		{
			label: "HASAR",
			active: false,
			color: "from-rose-500 to-pink-500",
			icon: AlertTriangle,
			bgColor: "bg-rose-50 dark:bg-rose-950/20",
			iconColor: "text-rose-600 dark:text-rose-400",
			to: `/arac-filo/${aracFiloId}/hasar`,
		},
		{
			label: "KAZA",
			active: false,
			color: "from-red-600 to-rose-600",
			icon: Car,
			bgColor: "bg-red-50 dark:bg-red-950/20",
			iconColor: "text-red-700 dark:text-red-500",
			to: `/arac-filo/${aracFiloId}/kaza`,
		},
		{
			label: "ALIŞ FATURASI",
			active: false,
			color: "from-indigo-500 to-blue-500",
			icon: FileText,
			bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
			iconColor: "text-indigo-600 dark:text-indigo-400",
			to: `/arac-filo/${aracFiloId}/alis-faturasi`,
		},
		{
			label: "FİLODAN ÇIKIŞ",
			active: false,
			color: "from-slate-500 to-gray-500",
			icon: ArrowLeft,
			bgColor: "bg-slate-50 dark:bg-slate-950/20",
			iconColor: "text-slate-600 dark:text-slate-400",
			to: `/arac-filo/${aracFiloId}/filodan-cikis`,
		},
	];
	const path = usePath();
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
			<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
						Araç Yönetim Modülleri
					</h2>
					<span className="text-sm text-slate-600 dark:text-slate-400">
						9 Modül
					</span>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
					{actionButtons.map((button) => {
						const Icon = button.icon;
						return (
							<Link
								key={button.to}
								to={button.to}
								className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02] cursor-pointer"
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${button.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
								/>

								<div className="relative p-4">
									<div className="flex flex-col items-center text-center space-y-3">
										<div
											className={`p-3 rounded-lg ${button.bgColor} group-hover:scale-110 transition-transform duration-300`}
										>
											<Icon className={`h-5 w-5 ${button.iconColor}`} />
										</div>
										<div className="space-y-1">
											<h3 className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-tight">
												{button.label}
											</h3>
										</div>
									</div>
								</div>
								<div
									className={cn(
										"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform transition-transform duration-300 origin-left",
										button.color,
										path === button.to
											? "scale-x-100"
											: "scale-x-0 group-hover:scale-x-100",
									)}
								/>
							</Link>
						);
					})}
				</div>

				{/* Quick Stats */}
				<div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
								<span className="text-slate-600 dark:text-slate-400">
									Aktif Modüller: 1
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-slate-400 rounded-full" />
								<span className="text-slate-600 dark:text-slate-400">
									Toplam: 9
								</span>
							</div>
						</div>
						<span className="text-slate-500 dark:text-slate-400">
							Son güncelleme: 2 dakika önce
						</span>
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
