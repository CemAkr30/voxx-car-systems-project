import { Button } from "@/components/ui/button";
import FirmaDialog from "@/components/web/firma/firma-dialog";
import { getAdreslerByFirmaIdQueryOptions } from "@/hooks/use-adres-hooks";
import { getAracKullananlarByFirmaIdQueryOptions } from "@/hooks/use-arac-kullanan-hooks";
import { getFirmaQueryOptions } from "@/hooks/use-firma-hooks";
import { cn, relativeDate } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Car, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/firma/$firmaId/_layout")({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getFirmaQueryOptions(firmaId));
		queryClient.ensureQueryData(getAdreslerByFirmaIdQueryOptions(firmaId));
		queryClient.ensureQueryData(
			getAracKullananlarByFirmaIdQueryOptions(firmaId),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const { data: firma } = useSuspenseQuery(getFirmaQueryOptions(firmaId));
	const [updateModal, setUpdateModal] = useState(false);
	return (
		<div className="flex w-full flex-col gap-8 p-6">
			<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-black/10" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />

				{/* Floating Elements */}
				<div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
				<div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />

				<div className="relative p-8 md:p-12">
					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
						{/* Left Side - Main Info */}
						<div className="flex-1">
							<div className="flex items-center gap-4 mb-6">
								<div className="relative">
									<div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm" />
									<div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
										<Building2 className="h-8 w-8 text-white" />
									</div>
								</div>
								<div>
									<h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
										{firma.unvan}
									</h1>
									<div className="flex items-center gap-2">
										<span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">
											#{firmaId}
										</span>
									</div>
								</div>
							</div>

							<p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
								Firma bilgilerinizi kolayca yönetin, güncelleyin ve takip edin.
								Tüm işlemlerinizi tek yerden kontrol edin.
							</p>
						</div>
					</div>

					{/* Bottom Action Bar */}
					<div className="mt-8 pt-6 border-t border-white/20">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								{firma.createdAt !== firma.updatedAt && (
									<div className="flex items-center gap-2">
										<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
										<span className="text-white/80 text-sm">
											Son güncelleme: {relativeDate(firma.updatedAt)}
										</span>
									</div>
								)}
							</div>
							<div className="flex items-center gap-3">
								<Button
									onClick={() => setUpdateModal(true)}
									className="px-4 py-2 bg-white hover:bg-white/90 rounded-xl text-indigo-600 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
								>
									Düzenle
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Link to="/firma/$firmaId/detay" params={{ firmaId }} className="group">
					<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02]">
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
								"from-blue-500 to-cyan-500",
							)}
						/>
						<div className="relative p-6">
							<div className="flex items-start justify-between mb-4">
								<div
									className={cn(
										"p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
										"bg-blue-50 dark:bg-blue-950/20",
									)}
								>
									<Building2
										className={cn(
											"h-7 w-7",
											"text-blue-600 dark:text-blue-400",
										)}
									/>
								</div>
								<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
							</div>
							<div className="space-y-2">
								<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
									Firma Detayları
								</h3>
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									Genel bilgiler ve detaylar
								</p>
							</div>
						</div>
						<div
							className={cn(
								"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
								"from-blue-500 to-cyan-500",
							)}
						/>
					</div>
				</Link>
				<Link to="/firma/$firmaId/iletisim" params={{ firmaId }} className="group">
					<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02]">
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
								"from-orange-500 to-red-500",
							)}
						/>
						<div className="relative p-6">
							<div className="flex items-start justify-between mb-4">
								<div
									className={cn(
										"p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
										"bg-orange-50 dark:bg-orange-950/20",
									)}
								>
									<Phone
										className={cn(
											"h-7 w-7",
											"text-orange-600 dark:text-orange-400",
										)}
									/>
								</div>
								<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
							</div>
							<div className="space-y-2">
								<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
									Firma İletişim
								</h3>
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									Adres bilgileri ve lokasyonlar
								</p>
							</div>
						</div>
						<div
							className={cn(
								"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
								"from-orange-500 to-red-500",
							)}
						/>
					</div>
				</Link>
				<Link to="/firma/$firmaId/adres" params={{ firmaId }} className="group">
					<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02]">
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
								"from-emerald-500 to-teal-500",
							)}
						/>
						<div className="relative p-6">
							<div className="flex items-start justify-between mb-4">
								<div
									className={cn(
										"p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
										"bg-emerald-50 dark:bg-emerald-950/20",
									)}
								>
									<MapPin
										className={cn(
											"h-7 w-7",
											"text-emerald-600 dark:text-emerald-400",
										)}
									/>
								</div>
								<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
							</div>
							<div className="space-y-2">
								<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
									Firma Adresleri
								</h3>
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									İletişim Bilgileri
								</p>
							</div>
						</div>
						<div
							className={cn(
								"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
								"from-emerald-500 to-teal-500",
							)}
						/>
					</div>
				</Link>
				<Link
					to="/firma/$firmaId/arac-kullanan"
					params={{ firmaId }}
					className="group"
				>
					<div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transform hover:scale-[1.02]">
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
								"from-purple-500 to-pink-500",
							)}
						/>
						<div className="relative p-6">
							<div className="flex items-start justify-between mb-4">
								<div
									className={cn(
										"p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
										"bg-purple-50 dark:bg-purple-950/20",
									)}
								>
									<Car
										className={cn(
											"h-7 w-7",
											"text-purple-600 dark:text-purple-400",
										)}
									/>
								</div>
								<ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
							</div>
							<div className="space-y-2">
								<h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
									Araç Kullananlar
								</h3>
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									Firmada araç kullanan kişilerin listesi
								</p>
							</div>
						</div>
						<div
							className={cn(
								"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
								"from-purple-500 to-pink-500",
							)}
						/>
					</div>
				</Link>
			</div>
			<div className="bg-white dark:bg-slate-950 rounded-lg border p-6">
				<Outlet />
			</div>

			<FirmaDialog
				mode="update"
				open={updateModal}
				close={() => setUpdateModal(false)}
				initialValues={firma}
			/>
		</div>
	);
}
