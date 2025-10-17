import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	getKiralanabilirAracFilolarQueryOptions,
	getKiralananAracFilolarByFirmaIdQueryOptions
} from "@/hooks/use-arac-kirala-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getAracFilolarQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import type { AracKirala } from "@/schemas/arac-kirala";
import AracKiralaDialog from "@/components/web/arac-kirala/arac-kirala-dialog";
import AracKiralaSilDialog from "@/components/web/arac-kirala/arac-kirala-sil-dialog";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedAracKirala?: AracKirala;
}

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/kiralanan-araclar/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getFirmalarQueryOptions());
		queryClient.ensureQueryData(getAracFilolarQueryOptions());
		queryClient.ensureQueryData(
			getKiralananAracFilolarByFirmaIdQueryOptions(firmaId),
		);
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getModellerQueryOptions());
	},
	component: RouteComponent,
});
function RouteComponent() {
	const { firmaId } = Route.useParams();

	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const [
		{ data: aracFilolar = [] },
		{ data: kiralananAraclar = [] },
		{ data: kiralanabilenAraclar = [] },
		{ data: markalar = [] },
		{ data: modeller = [] },
	] = useSuspenseQueries({
		queries: [
			getAracFilolarQueryOptions(),
			getKiralananAracFilolarByFirmaIdQueryOptions(firmaId),
			getKiralanabilirAracFilolarQueryOptions(),
			getMarkalarQueryOptions(),
			getModellerQueryOptions(),
		],
	});

	const openDialog = (type: keyof DialogState, kiralananArac?: AracKirala) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedAracKirala: kiralananArac,
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
									Firma Araç Kiralama Bilgileri
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
								Yeni Arac Kirala
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Arac Plaka</TableHead>
							<TableHead>Marka / Model</TableHead>
							<TableHead>Sözleşme Başlangıç</TableHead>
							<TableHead>Sözleşme Bitiş</TableHead>
							<TableHead>Ödeme Vadesi</TableHead>
							<TableHead>Teslimat Tutanağı</TableHead>
							<TableHead>Sözleşme</TableHead>
							<TableHead className="w-12">İşlemler</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{kiralananAraclar.map((kiralananArac) => (
							<TableRow key={kiralananArac.id}>
								<TableCell className="font-medium">
									<Link
										to="/arac-filo/$aracFiloId/detay"
										params={{ aracFiloId: kiralananArac.aracFiloId }}
									>
										{
											aracFilolar.find(
												(a) => a.id === kiralananArac.aracFiloId,
											)!.plaka
										}
									</Link>
								</TableCell>
								<TableCell>
									{
										markalar.find(
											(m) =>
												m.id ===
												aracFilolar.find(
													(a) => a.id === kiralananArac.aracFiloId,
												)!.markaId,
										)?.adi
									}{" "}
									/
									{
										modeller.find(
											(m) =>
												m.id ===
												aracFilolar.find(
													(a) => a.id === kiralananArac.aracFiloId,
												)!.modelId,
										)?.adi
									}
								</TableCell>
								<TableCell>
									{formatDate(kiralananArac.sozlesmeBaslangicTarihi.toString())}
								</TableCell>
								<TableCell>
									{formatDate(kiralananArac.sozlesmeBitisTarihi.toString())}
								</TableCell>
								<TableCell>
									{kiralananArac.odemeVadesi ? `${kiralananArac.odemeVadesi} gün` : '-'}
								</TableCell>
								<TableCell>
									{kiralananArac.teslimatTutanagi ? (
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const newWindow = window.open();
												if (newWindow) {
													newWindow.document.write(
														`<iframe src="data:application/pdf;base64,${kiralananArac.teslimatTutanagi}" frameborder="0" style="width:100vw;height:100vh;"></iframe>`,
													);
												}
											}}
											className="flex items-center gap-1"
										>
											Göster
										</Button>
									) : (
										<span className="text-gray-400 text-sm">Dosya yok</span>
									)}
								</TableCell>
								<TableCell>
									{kiralananArac.sozlesme ? (
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												const newWindow = window.open();
												if (newWindow) {
													newWindow.document.write(
														`<iframe src="data:application/pdf;base64,${kiralananArac.sozlesme}" frameborder="0" style="width:100vw;height:100vh;"></iframe>`,
													);
												}
											}}
											className="flex items-center gap-1"
										>
											Göster
										</Button>
									) : (
										<span className="text-gray-400 text-sm">Dosya yok</span>
									)}
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-2">
										<Button
											onClick={() => openDialog("update", kiralananArac)}
											variant="ghost"
											type="button"
											className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
										>
											<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
										</Button>
										<Button
											onClick={() => openDialog("delete", kiralananArac)}
											variant="ghost"
											type="button"
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

			{/* Dialogs */}
			{dialogState.create && (
				<AracKiralaDialog
					mode="firma"
					open={dialogState.create}
					close={closeDialog}
					kiralanabilenAraclar={kiralanabilenAraclar}
					initialValues={{ firmaId, aracFiloId: "" }}
				/>
			)}

			{dialogState.update && dialogState.selectedAracKirala && (
				<AracKiralaDialog
					mode="firma"
					open={dialogState.update}
					close={closeDialog}
					kiralanabilenAraclar={[
						...kiralanabilenAraclar,
						// Güncelleme modunda mevcut kiralanan araç filoyu da ekle
						aracFilolar.find(a => a.id === dialogState.selectedAracKirala!.aracFiloId)!
					]}
					initialValues={{ 
						firmaId: dialogState.selectedAracKirala.firmaId, 
						aracFiloId: dialogState.selectedAracKirala.aracFiloId 
					}}
					updateData={dialogState.selectedAracKirala}
				/>
			)}

			{dialogState.delete && dialogState.selectedAracKirala && (
				<AracKiralaSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedAracKirala={dialogState.selectedAracKirala}
				/>
			)}
		</div>
	);
}
