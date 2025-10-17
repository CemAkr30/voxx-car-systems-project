import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppForm } from "@/hooks/demo.form";
import {
	getKazalarByAracFiloIdQueryOptions,
	useCreateKazaMutation,
	useUpdateKazaMutation,
} from "@/hooks/use-kaza-hooks";
import {
	type Kaza,
	kazaCreateSchema,
	kazaUpdateSchema,
	type CreateKazaRequest,
} from "@/schemas/kaza";
import { RefreshCw, FileText, Eye } from "lucide-react";
import type { Firma } from "@/schemas/firma.ts";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { validateFileType, getFileTypeErrorMessage } from "@/lib/utils";
import {
	KazaNedeniListesi,
	KazaNedeniListesiLabel,
	OnarimDurumuTipiListesi,
	OnarimDurumuTipiListesiLabel,
} from "@/enums";
import { useQueryClient } from "@tanstack/react-query";

interface KazaDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: { aracFiloId: string };
}

interface KazaDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: Kaza;
}

type KazaDialogProps = KazaDialogCreateProps | KazaDialogUpdateProps;

export default function KazaDialog(props: KazaDialogProps) {
	const { mode, open, close, firmalar, aracFiloId } = props;
	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");
	
	// Edit modunda mevcut kaza tutanağı varsa göster
	const hasExistingKazaTutanagi = mode === "update" && props.initialValues.kazaTutanagi;

	const onarimDurumuOptions = OnarimDurumuTipiListesi.map((onarimDurumu) => ({
		label: OnarimDurumuTipiListesiLabel[onarimDurumu],
		value: onarimDurumu,
	}));

	const kazaNedeniOptions = KazaNedeniListesi.map((kazaNedeni) => ({
		label: KazaNedeniListesiLabel[kazaNedeni],
		value: kazaNedeni,
	}));

	const firmalarOptions = useMemo(
		() =>
			firmalar.map((firma: Firma) => ({
				label: firma.unvan,
				value: firma.id,
			})),
		[firmalar],
	);

	const createKazaMutation = useCreateKazaMutation(close);
	const updateKazaMutation =
		mode === "create" ? null : useUpdateKazaMutation(close);

	// Dosyayı base64'e çeviren fonksiyon
	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const result = reader.result as string;
				// "data:application/pdf;base64," kısmını kaldırıp sadece base64 string'i al
				const base64 = result.split(',')[1];
				resolve(base64);
			};
			reader.onerror = (error) => reject(error);
		});
	};

	// Mevcut kaza tutanağı dosyasını indir
	const showExistingKazaTutanagi = () => {
		if (hasExistingKazaTutanagi && props.initialValues.kazaTutanagi) {
			try {
				// Base64 string'i binary'ye çevir
				const binaryString = atob(props.initialValues.kazaTutanagi);
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
				}
				
				// Blob oluştur ve indir
				const blob = new Blob([bytes], { type: mimeType });
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = `kaza-tutanagi.${fileExtension}`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error("Dosya indirme hatası:", error);
			}
		}
	};

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						firmaId: "",
						onarimDurumu: OnarimDurumuTipiListesi[0],
						kazaIli: "",
						kazaNedeni: "",
						kazaTarihi: new Date(),
						kazaTutanagi: "",
						musteriId: "",
						odeyenFirmaId: "",
					}
				: {
						...props.initialValues,
						kazaTarihi: new Date(props.initialValues.kazaTarihi),
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? kazaCreateSchema : kazaUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				let submitValue = { ...value };
				
				// Eğer dosya seçilmişse base64'e çevir
				if (selectedFile) {
					const base64String = await convertFileToBase64(selectedFile);
					submitValue = { ...submitValue, kazaTutanagi: base64String };
				}

				if (mode === "create") {
					await createKazaMutation.mutateAsync(submitValue as CreateKazaRequest);
				} else if (mode === "update") {
					await updateKazaMutation!.mutateAsync(submitValue as Kaza);
				}
				await queryClient.invalidateQueries(
					getKazalarByAracFiloIdQueryOptions(aracFiloId),
				);
				formApi.reset();
				setSelectedFile(null);
				setFileName("");
			} catch (_error) {}
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				close();
				form.reset();
				setSelectedFile(null);
				setFileName("");
			}}
		>
			<DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>
					{mode === "create" ? "Yeni Kaza Ekle" : "Seçili Kazayı Güncelle"}
				</DialogTitle>
				<DialogDescription>
					{mode === "create"
						? "Yeni kaza eklemek için formu eksiksiz doldurunuz"
						: "Seçili kazayı güncellemek için formu eksiksiz doldurunuz"}
				</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.AppField name="firmaId">
						{(field) => <field.Select label="Firma" values={firmalarOptions} />}
					</form.AppField>

					<form.AppField name="odeyenFirmaId">
						{(field) => (
							<field.Select label="Ödeyen Firma" values={firmalarOptions} />
						)}
					</form.AppField>

					<form.AppField name="kazaTarihi">
						{(field) => <field.DatePicker label="Kaza Tarihi" />}
					</form.AppField>

					<form.AppField name="kazaIli">
						{(field) => <field.TextField label="Kaza İli" />}
					</form.AppField>

					<form.AppField name="kazaNedeni">
						{(field) => (
							<field.Select label="Kaza Nedeni" values={kazaNedeniOptions} />
						)}
					</form.AppField>

					{/* Kaza Tutanağı Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="kazaTutanagi">Kaza Tutanağı</Label>
						
						{/* Mevcut kaza tutanağı varsa göster */}
						{hasExistingKazaTutanagi && !selectedFile && (
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Mevcut kaza tutanağı dosyası mevcut</span>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={showExistingKazaTutanagi}
									>
										<Eye className="h-4 w-4 mr-1" />
										İndir
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => {
											// Mevcut kaza tutanağını kaldır
											form.setFieldValue('kazaTutanagi', '');
										}}
									>
										Kaldır
									</Button>
								</div>
							</div>
						)}
						
						<div className="flex items-center space-x-2">
							<Input
								id="kazaTutanagi"
								type="file"
								accept=".pdf,.jpg,.jpeg,.png"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											if (!validateFileType(file)) {
												toast.error(getFileTypeErrorMessage());
												e.target.value = '';
												return;
											}
											setSelectedFile(file);
											setFileName(file.name);
										}
									}}
								className="flex-1"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									setSelectedFile(null);
									setFileName("");
									const fileInput = document.getElementById('kazaTutanagi') as HTMLInputElement;
									if (fileInput) {
										fileInput.value = '';
									}
								}}
								disabled={!selectedFile}
							>
								Temizle
							</Button>
						</div>
						{selectedFile && (
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<FileText className="h-4 w-4" />
								<span>{fileName}</span>
								<span className="text-xs">
									({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
								</span>
							</div>
						)}
								<p className="text-xs text-gray-500">
									Sadece PDF ve görsel (JPG, JPEG, PNG) dosyaları yüklenebilir.
								</p>
					</div>

					<form.AppField name="onarimDurumu">
						{(field) => (
							<field.Select
								label="Onarım Durumu"
								values={onarimDurumuOptions}
							/>
						)}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createKazaMutation.isPending
									: updateKazaMutation!.isPending
							}
						>
							{mode === "create" ? (
								createKazaMutation.isPending
							) : updateKazaMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Kaza Ekle" : "Seçili Kazayı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
