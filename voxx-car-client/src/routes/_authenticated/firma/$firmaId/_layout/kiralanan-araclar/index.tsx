import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Download } from "lucide-react";
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

	// Dosya indirme fonksiyonu
	const downloadFile = (base64String: string, fileName: string) => {
		if (!base64String) return;
		
		// Base64 string'i binary'ye çevir
		const binaryString = atob(base64String);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		
		// Dosya tipini belirle (ilk birkaç byte'a bakarak)
		let mimeType = 'application/octet-stream';
		let fileExtension = 'bin';
		
		if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
			// PDF
			mimeType = 'application/pdf';
			fileExtension = 'pdf';
		} else if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
			// JPEG
			mimeType = 'image/jpeg';
			fileExtension = 'jpg';
		} else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
			// PNG
			mimeType = 'image/png';
			fileExtension = 'png';
		} else if (bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0) {
			// DOC/DOCX
			mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
			fileExtension = 'docx';
		}
		
		// Blob oluştur ve indir
		const blob = new Blob([bytes], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${fileName}.${fileExtension}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
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
							<TableHead>Teslimat Tutanağı</TableHead>
							<TableHead>Sözleşme</TableHead>
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
									{formatCurrency(kiralananArac.aylikFaturaTutari)}
								</TableCell>
								<TableCell>
									{formatCurrency(kiralananArac.sozlesmeTutari)}
								</TableCell>
								<TableCell>{formatCurrency(kiralananArac.kapora)}</TableCell>
								<TableCell>
									{kiralananArac.teslimatTutanagi ? (
										<Button
											variant="outline"
											size="sm"
											onClick={() => downloadFile(
												kiralananArac.teslimatTutanagi!,
												`teslimat-tutanagi-${kiralananArac.id}`
											)}
											className="flex items-center gap-1"
										>
											<Download className="h-4 w-4" />
											İndir
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
											onClick={() => downloadFile(
												kiralananArac.sozlesme!,
												`sozlesme-${kiralananArac.id}`
											)}
											className="flex items-center gap-1"
										>
											<Download className="h-4 w-4" />
											İndir
										</Button>
									) : (
										<span className="text-gray-400 text-sm">Dosya yok</span>
									)}
								</TableCell>
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
