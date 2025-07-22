import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import MuayeneDialog from "@/components/web/muayene/muayene-dialog";
import MuayeneSilDialog from "@/components/web/muayene/muayene-sil-dialog";
import { MuayeneTipiListesiLabel, OdemeTipiListesiLabel } from "@/enums";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { getMuayenelerByAracFiloIdQueryOptions } from "@/hooks/use-muayene-hooks";
import { formatCurrency, formatDate, getPaymentTypeColor } from "@/lib/utils";
import type { Muayene } from "@/schemas/muayene";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Edit, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/muayene/",
)({
	loader: ({ context: { queryClient }, params: { aracFiloId } }) => {
		queryClient.ensureQueryData(
			getMuayenelerByAracFiloIdQueryOptions(aracFiloId),
		);
		queryClient.ensureQueryData(getFirmalarQueryOptions());
	},
	component: RouteComponent,
});

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedMuayene?: Muayene;
}

function RouteComponent() {
	const { aracFiloId } = Route.useParams();
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const [{ data: muayeneler = [] }, { data: firmalar }] = useSuspenseQueries({
		queries: [
			getMuayenelerByAracFiloIdQueryOptions(aracFiloId),
			getFirmalarQueryOptions(),
		],
	});

	const openDialog = (type: keyof DialogState, muayene?: Muayene) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedMuayene: muayene,
		});
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
	};

	const getMuayeneTypeColor = (type: string) => {
		const colors = {
			EGZOS:
				"bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
			FENNI:
				"bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
		};
		return (
			colors[type as keyof typeof colors] ||
			"bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
		);
	};

	const isExpiringSoon = (bitisTarihi: Date) => {
		const today = new Date();
		const thirtyDaysFromNow = new Date(
			today.getTime() + 30 * 24 * 60 * 60 * 1000,
		);
		return bitisTarihi <= thirtyDaysFromNow && bitisTarihi >= today;
	};

	const isExpired = (bitisTarihi: Date) => {
		return bitisTarihi < new Date();
	};

	return (
		<div className="w-full space-y-4">
			<div className="space-y-6">
				<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
					<div className="absolute inset-0 bg-black/10" />
					<div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
					<div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

					<div className="relative z-10">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
										<svg
											className="w-8 h-8"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
										</svg>
									</div>
									<div>
										<h1 className="text-3xl font-bold">
											Muayene Yönetim Sistemi
										</h1>
										<p className="text-white/80 text-lg">
											Muayene Yönetim Paneli
										</p>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<Button
									className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105"
									onClick={() => openDialog("create")}
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									Yeni Muayene Ekle
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
				<Table>
					<TableHeader>
						<TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20">
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Makbuz No
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Araç Filo ID
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Muayene Tipi
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Miktar
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Ödeme Tipi
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Muayene Yeri
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Geçerlilik
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Durum
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
								İşlemler
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{muayeneler.map((muayene) => (
							<TableRow
								key={muayene.id}
								className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
							>
								<TableCell>
									<div>
										<p className="font-medium text-slate-900 dark:text-slate-100">
											{muayene.makbuzNo}
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
											{muayene.aciklama}
										</p>
									</div>
								</TableCell>
								<TableCell>
									<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono text-slate-700 dark:text-slate-300">
										{muayene.aracFiloId}
									</span>
								</TableCell>
								<TableCell>
									<Badge className={getMuayeneTypeColor(muayene.muayeneTipi)}>
										{MuayeneTipiListesiLabel[muayene.muayeneTipi]}
									</Badge>
								</TableCell>
								<TableCell>
									<div>
										<p className="font-semibold text-slate-900 dark:text-slate-100">
											{formatCurrency(muayene.miktar)}
										</p>
										{Number.parseFloat(muayene.gecikmeCezasi) > 0 && (
											<p className="text-sm text-red-600 dark:text-red-400">
												+
												{formatCurrency(
													Number.parseFloat(muayene.gecikmeCezasi),
												)}{" "}
												ceza
											</p>
										)}
									</div>
								</TableCell>
								<TableCell>
									<Badge className={getPaymentTypeColor(muayene.odemeTipi)}>
										{OdemeTipiListesiLabel[muayene.odemeTipi]}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-1 max-w-xs">
										<MapPin className="h-3 w-3 text-slate-400 flex-shrink-0" />
										<span className="text-sm text-slate-600 dark:text-slate-400 truncate">
											{muayene.yeri}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="space-y-1">
										<div className="flex items-center gap-1">
											<Calendar className="h-3 w-3 text-slate-400" />
											<span className="text-xs text-slate-500 dark:text-slate-400">
												{formatDate(new Date().toString())} -{" "}
												{formatDate(new Date().toString())}
											</span>
										</div>
										{isExpired(muayene.bitisTarihi) ? (
											<Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs">
												Süresi Dolmuş
											</Badge>
										) : isExpiringSoon(muayene.bitisTarihi) ? (
											<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs">
												Yakında Dolacak
											</Badge>
										) : (
											<Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
												Geçerli
											</Badge>
										)}
									</div>
								</TableCell>
								<TableCell>
									<Badge
										className={
											muayene.odendi
												? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
												: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
										}
									>
										{muayene.odendi ? "Ödendi" : "Ödenmedi"}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-2">
										<Button
											onClick={() => openDialog("update", muayene)}
											variant="ghost"
											size="sm"
											className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
										>
											<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
										</Button>
										<Button
											onClick={() => openDialog("delete", muayene)}
											variant="ghost"
											size="sm"
											className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
										>
											<Trash2 className="h-4 w-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{dialogState.create && (
				<MuayeneDialog
					aracFiloId={aracFiloId}
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ aracFiloId }}
					firmalar={firmalar}
				/>
			)}

			{dialogState.update && dialogState.selectedMuayene && (
				<MuayeneDialog
					aracFiloId={aracFiloId}
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedMuayene}
					firmalar={firmalar}
				/>
			)}

			{dialogState.delete && (
				<MuayeneSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedMuayene={dialogState.selectedMuayene!}
				/>
			)}
		</div>
	);
}
