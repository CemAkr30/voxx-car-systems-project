import { Label } from "@/components/ui/label";
import { getFirmaQueryOptions } from "@/hooks/use-firma-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Building2,
	Calendar,
	DollarSign,
	Globe,
	Mail,
	MapPin,
	Phone,
	TrendingUp,
	Users,
} from "lucide-react";

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/detay/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getFirmaQueryOptions(firmaId));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const { data: firma } = useSuspenseQuery(getFirmaQueryOptions(firmaId));
	return;
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
							<Users className="h-6 w-6 text-white" />
						</div>
						<div>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								Toplam Çalışan
							</p>
							<p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
								{"companyData.employeeCount"}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
							<DollarSign className="h-6 w-6 text-white" />
						</div>
						<div>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								Yıllık Ciro
							</p>
							<p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
								₺{(25000000 / 1000000).toFixed(1)}M REVENUE
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
							<TrendingUp className="h-6 w-6 text-white" />
						</div>
						<div>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								Pazar Payı
							</p>
							<p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
								{"companyData.marketShare"}%
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
							<Calendar className="h-6 w-6 text-white" />
						</div>
						<div>
							<p className="text-sm text-slate-600 dark:text-slate-400">
								Kuruluş
							</p>
							<p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
								2020
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column */}
				<div className="lg:col-span-2 space-y-8">
					{/* Company Information */}
					<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
						<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
							<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
								<Building2 className="h-5 w-5" />
								Genel Bilgiler
							</h2>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Firma Adı
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{firma.unvan}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Vergi Numarası
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-mono">
										{firma.vergiNo}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Ticaret Sicil No
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-mono">
										{"companyData.tradeRegistryNumber"}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										MERSİS No
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-mono">
										{"companyData.mersisNumber"}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Hukuki Statü
									</Label>
									<p className="text-slate-900 dark:text-slate-100">
										{"companyData.legalStatus"}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Sermaye
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-semibold">
										₺{"companyData.capital.toLocaleString()"}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Sektör
									</Label>
									<p className="text-slate-900 dark:text-slate-100">
										{"companyData.sector"}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Durum
									</Label>
									<span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium rounded-full">
										<div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
										{"companyData.status"}
									</span>
								</div>
							</div>
							<div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
								<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
									Açıklama
								</Label>
								<p className="text-slate-900 dark:text-slate-100 mt-2 leading-relaxed">
									{"companyData.description"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-8">
					{/* Contact Information */}
					<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
						<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
							<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
								<Phone className="h-5 w-5" />
								İletişim Bilgileri
							</h2>
						</div>
						<div className="p-6 space-y-4">
							<div className="flex items-center gap-3">
								<Phone className="h-4 w-4 text-slate-400" />
								<div>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										Telefon
									</p>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{"companyData.phone"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="h-4 w-4 text-slate-400" />
								<div>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										Faks
									</p>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{"companyData.fax"}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="h-4 w-4 text-slate-400" />
								<div>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										E-posta
									</p>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{firma.email}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Globe className="h-4 w-4 text-slate-400" />
								<div>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										Website
									</p>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{"companyData.website"}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<MapPin className="h-4 w-4 text-slate-400 mt-1" />
								<div>
									<p className="text-sm text-slate-600 dark:text-slate-400">
										Adres
									</p>
									<p className="text-slate-900 dark:text-slate-100 font-medium">
										{"companyData.address"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
