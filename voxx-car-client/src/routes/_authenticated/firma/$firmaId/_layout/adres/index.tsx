import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import type { Adres } from "@/schemas/adres";
import { createFileRoute } from "@tanstack/react-router";
import {
	MoreHorizontal,
	MapPin,
	Edit,
	Trash2,
	Award,
	Building,
	Calculator,
	Factory,
	FileText,
	Home,
	Store,
	Truck,
	Wrench,
} from "lucide-react";
import { useState } from "react";
import { getAdreslerByFirmaIdQueryOptions } from "@/hooks/use-adres-hooks";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AdresTipiListesiLabel, type AdresTipi } from "@/enums";
import { Button } from "@/components/ui/button";
import AdresDialog from "@/components/web/adres/adres-dialog";
import AdresSilDialog from "@/components/web/adres/adres-sil-dialog";
import type { WebSocketMessage } from "@/types";
import { useWebSocketTopic } from "@/hooks/use-webhook";
import { toast } from "sonner";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedAdres?: Adres;
}

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/adres/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getAdreslerByFirmaIdQueryOptions(firmaId));
	},
	component: RouteComponent,
});

const getAddressTypeInfo = (type: AdresTipi) => {
	switch (type) {
		case "MERKEZ":
			return {
				label: "Merkez Ofis",
				icon: Building,
				color: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
			};
		case "SUBE":
			return {
				label: "Şube",
				icon: Home,
				color: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
			};
		case "SHOWROOM":
			return {
				label: "Showroom",
				icon: Store,
				color: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
			};
		case "SERVIS":
			return {
				label: "Servis",
				icon: Wrench,
				color: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
			};
		case "DEPO":
			return {
				label: "Depo",
				icon: Factory,
				color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
			};
		case "FATURA":
			return {
				label: "Fatura Adresi",
				icon: FileText,
				color: "bg-gradient-to-r from-violet-500 to-purple-500 text-white",
			};
		case "MUHASEBE":
			return {
				label: "Muhasebe",
				icon: Calculator,
				color: "bg-gradient-to-r from-slate-500 to-gray-500 text-white",
			};
		case "TESLIMAT":
			return {
				label: "Teslimat",
				icon: Truck,
				color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
			};
		case "YETKILI_BAYI":
			return {
				label: "Yetkili Bayi",
				icon: Award,
				color: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white",
			};
		case "DIGER":
			return {
				label: "Diğer",
				icon: MoreHorizontal,
				color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
			};
		default:
			return {
				label: "Bilinmeyen",
				icon: MoreHorizontal,
				color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
			};
	}
};

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const queryClient = useQueryClient();

	useWebSocketTopic<WebSocketMessage>({
		topic: "/topic/adres",
		onMessage: async ({ type }) => {
			if (type === "CREATED") {
				toast.success("Adres başarılı bir şekilde kayıt edildi");
			}
			if (type === "UPDATED") {
				toast.success("Adres başarılı bir şekilde güncellendi");
			}
			if (type === "DELETED") {
				toast.success("Adres başarılı bir şekilde silindi");
			}
			await queryClient.invalidateQueries(
				getAdreslerByFirmaIdQueryOptions(firmaId),
			);
		},
	});

	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const { data: adresler = [] } = useSuspenseQuery(
		getAdreslerByFirmaIdQueryOptions(firmaId),
	);

	const openDialog = (type: keyof DialogState, adres?: Adres) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedAdres: adres,
		});
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
	};

	return (
		<div className="space-y-8">
			<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
				<div className="absolute inset-0 bg-black/10" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
				<div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
				<div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
				<div className="relative p-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div className="flex items-center gap-4">
							<div className="relative">
								<div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
								<div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
									<MapPin className="h-7 w-7 text-white" />
								</div>
							</div>
							<div>
								<h1 className="text-3xl font-bold text-white mb-2">Adresler</h1>
							</div>
						</div>
						<div className="flex items-center gap-3">
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
								Yeni Adres
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
				<Table>
					<TableHeader>
						<TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20">
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Tip
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Adres
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
								İşlemler
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{adresler.map((adres) => {
							const adresTip = getAddressTypeInfo(adres.tip);
							return (
								<TableRow
									key={adres.id}
									className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-lg ${getAddressTypeInfo(adres.tip)} shadow-sm`}
											>
												<adresTip.icon className="h-4 w-4" />
											</div>
											<div>
												<span className="font-medium text-slate-900 dark:text-slate-100">
													{AdresTipiListesiLabel[adres.tip]}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="max-w-xs">
											<p className="font-medium text-slate-900 dark:text-slate-100 truncate">
												{adres.aciklama}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<Button
												onClick={() => openDialog("update", adres)}
												variant="ghost"
												type="button"
												className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
											>
												<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
											</Button>
											<Button
												onClick={() => openDialog("delete", adres)}
												variant="ghost"
												type="button"
												className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
											>
												<Trash2 className="h-4 w-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>

			{/* Dialogs */}
			{dialogState.create && (
				<AdresDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ firmaId }}
				/>
			)}

			{dialogState.update && dialogState.selectedAdres && (
				<AdresDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedAdres}
				/>
			)}

			{dialogState.delete && (
				<AdresSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedAdres={dialogState.selectedAdres!}
				/>
			)}
		</div>
	);
}
