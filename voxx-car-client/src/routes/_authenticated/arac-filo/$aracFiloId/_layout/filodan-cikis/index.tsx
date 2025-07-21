import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getFilodanCikisByAracFiloIdQueryOptions } from "@/hooks/use-filodan-cikis-hooks";
import type { FilodanCikis } from "@/schemas/filodan-cikis";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import FilodanCikisDialog from "@/components/web/filodan-cikis/filodan-cikis-dialog";
import FilodanCikisSilDialog from "@/components/web/filodan-cikis/filodan-cikis-sil-dialog";
import { FilodanCikisNedeniListesiLabel } from "@/enums";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/filodan-cikis/",
)({
	loader: ({ context: { queryClient }, params: { aracFiloId } }) => {
		queryClient.ensureQueryData(
			getFilodanCikisByAracFiloIdQueryOptions(aracFiloId),
		);
	},
	component: RouteComponent,
});

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedFilodanCikis?: FilodanCikis;
}

function RouteComponent() {
	const { aracFiloId } = Route.useParams();
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const { data: filodanCikislar = [] } = useSuspenseQuery(
		getFilodanCikisByAracFiloIdQueryOptions(aracFiloId),
	);

	const openDialog = (type: keyof DialogState, filodanCikis?: FilodanCikis) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedFilodanCikis: filodanCikis,
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
											Filodan Çıkış Yönetim Sistemi
										</h1>
										<p className="text-white/80 text-lg">
											Filodan Çıkış Yönetim Paneli
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
									Yeni Filodan Çıkış Ekle
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
								Filodan Çıkış Nedeni
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Filodan Çıkış Tarihi
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Alıcı
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Anahtar Teslim Fiyatı
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Arac Devir Giderleri
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
								Açıklama
							</TableHead>
							<TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
								İşlemler
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filodanCikislar.map((filodanCikis) => {
							return (
								<TableRow
									key={filodanCikis.id}
									className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
								>
									<TableCell>
										<div className="flex items-center gap-3">
											<div>
												<span className="font-medium text-slate-900 dark:text-slate-100">
													{
														FilodanCikisNedeniListesiLabel[
															filodanCikis.filodanCikisNedeni
														]
													}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono text-slate-700 dark:text-slate-300">
											{formatDate(filodanCikis.filodanCikisTarihi.toString())}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
											{filodanCikis.alici}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
											{filodanCikis.anahtarTeslimFiyati}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
											{filodanCikis.aracDevirGiderleri}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
											{filodanCikis.aciklama}
										</span>
									</TableCell>

									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<Button
												onClick={() => openDialog("update", filodanCikis)}
												variant="ghost"
												type="button"
												className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
											>
												<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
											</Button>
											<Button
												onClick={() => openDialog("delete", filodanCikis)}
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

			{dialogState.create && (
				<FilodanCikisDialog
					aracFiloId={aracFiloId}
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ aracFiloId }}
				/>
			)}

			{dialogState.update && dialogState.selectedFilodanCikis && (
				<FilodanCikisDialog
					aracFiloId={aracFiloId}
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedFilodanCikis}
				/>
			)}

			{dialogState.delete && (
				<FilodanCikisSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedFilodanCikis={dialogState.selectedFilodanCikis!}
				/>
			)}
		</div>
	);
}
