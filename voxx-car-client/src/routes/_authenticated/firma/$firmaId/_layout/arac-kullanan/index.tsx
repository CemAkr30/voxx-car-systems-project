import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import type { AracKullanan } from "@/schemas/arac-kullanan";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { getAracKullananlarByFirmaIdQueryOptions } from "@/hooks/use-arac-kullanan-hooks";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { Button } from "@/components/ui/button";
import AracKullananDialog from "@/components/web/arac-kullanan/arac-kullanan-dialog";
import AracKullananSilDialog from "@/components/web/arac-kullanan/arac-kullanan-sil-dialog";
import { useWebSocketTopic } from "@/hooks/use-webhook";
import type { WebSocketMessage } from "@/types";
import { toast } from "sonner";
interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedAracKullanan?: AracKullanan;
}

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/arac-kullanan/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getFirmalarQueryOptions());
		queryClient.ensureQueryData(
			getAracKullananlarByFirmaIdQueryOptions(firmaId),
		);
	},
	component: RouteComponent,
});
function RouteComponent() {
	const { firmaId } = Route.useParams();
	const queryClient = useQueryClient();

	useWebSocketTopic<WebSocketMessage>({
		topic: "/topic/aracKullanan",
		onMessage: async ({ type }) => {
			if (type === "CREATED") {
				toast.success("Araç kullanan başarılı bir şekilde kayıt edildi");
			}
			if (type === "UPDATED") {
				toast.success("Araç kullanan başarılı bir şekilde güncellendi");
			}
			if (type === "DELETED") {
				toast.success("Araç kullanan başarılı bir şekilde silindi");
			}
			await queryClient.invalidateQueries(
				getAracKullananlarByFirmaIdQueryOptions(firmaId),
			);
		},
	});

	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});
	const [_, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: aracKullananler = [] } = useSuspenseQuery(
		getAracKullananlarByFirmaIdQueryOptions(firmaId),
	);

	const openDialog = (type: keyof DialogState, aracKullanan?: AracKullanan) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedAracKullanan: aracKullanan,
		});
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
		setOpenDropdowns(new Set());
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
								<h1 className="text-3xl font-bold text-white mb-2">
									Arac Kullananlar
								</h1>
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
								Yeni Arac Kullanan
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
								AracKullanan
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								İlçe/Şehir
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Posta Kodu
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Telefon
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
						{aracKullananler.map((aracKullanan) => {
							return (
								<TableRow
									key={aracKullanan.id}
									className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
								>
									<TableCell>
										<div className="max-w-xs">
											<p className="font-medium text-slate-900 dark:text-slate-100 truncate">
												{`${aracKullanan.ad} ${aracKullanan.soyad}`}
											</p>
										</div>
									</TableCell>
									<TableCell>
										<div>
											<p className="font-medium text-slate-900 dark:text-slate-100">
												{aracKullanan.telefonNo}
											</p>
											<p className="text-sm text-slate-500 dark:text-slate-400">
												{aracKullanan.email}
											</p>
										</div>
									</TableCell>
									<TableCell>
										<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono text-slate-700 dark:text-slate-300">
											{"aracKullanan.postalCode"}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
											{"aracKullanan.phone"}
										</span>
									</TableCell>
									<TableCell>
										<span className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
											Aktif
										</span>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<Button
												onClick={() => openDialog("update", aracKullanan)}
												variant="ghost"
												type="button"
												className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
											>
												<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
											</Button>
											<Button
												onClick={() => openDialog("delete", aracKullanan)}
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
				<AracKullananDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ firmaId }}
				/>
			)}

			{dialogState.update && dialogState.selectedAracKullanan && (
				<AracKullananDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={{
						...dialogState.selectedAracKullanan,
						ehliyetBitisTarihi: new Date(
							dialogState.selectedAracKullanan.ehliyetBitisTarihi,
						),
					}}
				/>
			)}

			{dialogState.delete && (
				<AracKullananSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedAracKullanan={dialogState.selectedAracKullanan!}
				/>
			)}
		</div>
	);
}
