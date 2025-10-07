import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { getKiralananAracFilolarByFirmaIdQueryOptions } from "@/hooks/use-arac-kirala-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { Button } from "@/components/ui/button";
import AracKullananDialog from "@/components/web/arac-kirala/arac-kirala-dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getAracFilolarQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import type { AracKirala } from "@/schemas/arac-kirala";

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
	const [_, setOpenDropdowns] = useState<Set<string>>(new Set());

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
			getAracFilolarQueryOptions(),
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
							<TableHead>Başlangıç Tarihi</TableHead>
							<TableHead>Bitiş Tarihi</TableHead>
							<TableHead>Aylık Fatura</TableHead>
							<TableHead>Sözleşme Tutarı</TableHead>
							<TableHead>Kapora</TableHead>
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
									{formatDate(kiralananArac.baslangicTarihi.toString())}
								</TableCell>
								<TableCell>
									{formatDate(kiralananArac.bitisTarihi.toString())}
								</TableCell>
								<TableCell>
									{formatCurrency(kiralananArac.aylikFaturaTutari)}
								</TableCell>
								<TableCell>
									{formatCurrency(kiralananArac.sozlesmeTutari)}
								</TableCell>
								<TableCell>{formatCurrency(kiralananArac.kapora)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Dialogs */}
			{dialogState.create && (
				<AracKullananDialog
					mode="firma"
					open={dialogState.create}
					close={closeDialog}
					kiralanabilenAraclar={kiralanabilenAraclar}
					initialValues={{ firmaId, aracFiloId: "" }}
				/>
			)}

			{/* {dialogState.update && dialogState.selectedAracKullanan && (
        <AracKullananDialog
          mode="update"
          open={dialogState.update}
          close={closeDialog}
          initialValues={{
            ...dialogState.selectedAracKullanan,
            ehliyetBitisTarihi: new Date(
              dialogState.selectedAracKullanan.ehliyetBitisTarihi
            ),
          }}
        />
      )} */}

			{/* {dialogState.delete && (
        <AracKullananSilDialog
          open={dialogState.delete}
          close={closeDialog}
          selectedAracKullanan={dialogState.selectedAracKullanan!}
        />
      )} */}
		</div>
	);
}
