import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import type { Iletisim } from "@/schemas/iletisim";
import { createFileRoute } from "@tanstack/react-router";
import {
	MoreHorizontal,
	MapPin,
	Edit,
	Trash2,
	Facebook,
	Globe,
	Instagram,
	Linkedin,
	Mail,
	MessageCircle,
	Phone,
	Printer,
	Smartphone,
	Twitter,
} from "lucide-react";
import { useState } from "react";
import { getIletisimlerByFirmaIdQueryOptions } from "@/hooks/use-iletisim-hooks";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { IletisimTipiListesiLabel, type IletisimTipi } from "@/enums";
import { Button } from "@/components/ui/button";
import IletisimDialog from "@/components/web/iletisim/iletisim-dialog";
import IletisimSilDialog from "@/components/web/iletisim/iletisim-sil-dialog";
import type { WebSocketMessage } from "@/types";
import { useWebSocketTopic } from "@/hooks/use-webhook";
import { toast } from "sonner";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedIletisim?: Iletisim;
}

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/iletisim/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getIletisimlerByFirmaIdQueryOptions(firmaId));
	},
	component: RouteComponent,
});

const getContactTypeInfo = (type: IletisimTipi) => {
	switch (type) {
		case "TELEFON":
			return {
				label: "Telefon",
				icon: Phone,
				color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
			};
		case "CEP_TELEFONU":
			return {
				label: "Cep Telefonu",
				icon: Smartphone,
				color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
			};
		case "FAKS":
			return {
				label: "Faks",
				icon: Printer,
				color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
			};
		case "E_POSTA":
			return {
				label: "E-Posta",
				icon: Mail,
				color: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
			};
		case "WEB_SITESI":
			return {
				label: "Web Sitesi",
				icon: Globe,
				color: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
			};
		case "WHATSAPP":
			return {
				label: "WhatsApp",
				icon: MessageCircle,
				color: "bg-gradient-to-r from-green-600 to-green-500 text-white",
			};
		case "LINKEDIN":
			return {
				label: "LinkedIn",
				icon: Linkedin,
				color: "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
			};
		case "INSTAGRAM":
			return {
				label: "Instagram",
				icon: Instagram,
				color: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
			};
		case "FACEBOOK":
			return {
				label: "Facebook",
				icon: Facebook,
				color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
			};
		case "TWITTER":
			return {
				label: "Twitter",
				icon: Twitter,
				color: "bg-gradient-to-r from-sky-400 to-blue-500 text-white",
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
		topic: "/topic/iletisim",
		onMessage: async ({ type }) => {
			if (type === "CREATED") {
				toast.success("İletişim başarılı bir şekilde kayıt edildi");
			}
			if (type === "UPDATED") {
				toast.success("İletişim başarılı bir şekilde güncellendi");
			}
			if (type === "DELETED") {
				toast.success("İletişim başarılı bir şekilde silindi");
			}
			await queryClient.invalidateQueries(
				getIletisimlerByFirmaIdQueryOptions(firmaId),
			);
		},
	});

	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const { data: iletisimler = [] } = useSuspenseQuery(
		getIletisimlerByFirmaIdQueryOptions(firmaId),
	);

	const openDialog = (type: keyof DialogState, iletisim?: Iletisim) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedIletisim: iletisim,
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
								<h1 className="text-3xl font-bold text-white mb-2">
									Iletisimler
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
								Yeni Iletisim
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
								Iletisim
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
								İşlemler
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{iletisimler.map((iletisim) => {
							const iletisimTip = getContactTypeInfo(iletisim.tip);
							return (
								<TableRow
									key={iletisim.id}
									className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-lg ${getContactTypeInfo(iletisim.tip)} shadow-sm`}
											>
												<iletisimTip.icon className="h-4 w-4" />
											</div>
											<div>
												<span className="font-medium text-slate-900 dark:text-slate-100">
													{IletisimTipiListesiLabel[iletisim.tip]}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="max-w-xs">
											<p className="font-medium text-slate-900 dark:text-slate-100 truncate">
												{iletisim.numara}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<Button
												onClick={() => openDialog("update", iletisim)}
												variant="ghost"
												type="button"
												className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
											>
												<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
											</Button>
											<Button
												onClick={() => openDialog("delete", iletisim)}
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
				<IletisimDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ firmaId }}
				/>
			)}

			{dialogState.update && dialogState.selectedIletisim && (
				<IletisimDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedIletisim}
				/>
			)}

			{dialogState.delete && (
				<IletisimSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedIletisim={dialogState.selectedIletisim!}
				/>
			)}
		</div>
	);
}
