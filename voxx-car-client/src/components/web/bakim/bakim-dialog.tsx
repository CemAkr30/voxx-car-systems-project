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
import {
	BakimNedeniTipiListesi,
	BakimNedeniTipiListesiLabel,
	OdemeYapanFirmaListesi,
	OdemeYapanFirmaListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getBakimlarByAracFiloIdQueryOptions,
	useCreateBakimMutation,
	useUpdateBakimMutation,
} from "@/hooks/use-bakim-hooks";
import {
	type Bakim,
	bakimCreateSchema,
	bakimUpdateSchema,
	type CreateBakimRequest,
} from "@/schemas/bakim";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { validateFileType, getFileTypeErrorMessage } from "@/lib/utils";

interface BakimDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: { aracFiloId: string };
}

interface BakimDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: Bakim;
}

type BakimDialogProps = BakimDialogCreateProps | BakimDialogUpdateProps;

export default function BakimDialog(props: BakimDialogProps) {
	const { mode, open, close, aracFiloId } = props;
	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");

	const bakimNedeniTipiOptions = BakimNedeniTipiListesi.map((bakimNedeni) => ({
		label: BakimNedeniTipiListesiLabel[bakimNedeni],
		value: bakimNedeni,
	}));

	const bakimOdeyenOptions = OdemeYapanFirmaListesi.map((firma) => ({
		label: OdemeYapanFirmaListesiLabel[firma],
		value: firma,
	}));

	const createBakimMutation = useCreateBakimMutation(close);
	const updateBakimMutation =
		mode === "create" ? null : useUpdateBakimMutation(close);

	// Edit modunda mevcut fatura varsa göster
	const hasExistingFatura = mode === "update" && props.initialValues.fatura;

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

	// Mevcut faturayı yeni sekmede göster
	const showExistingFatura = () => {
		if (hasExistingFatura && props.initialValues.fatura) {
			try {
				// Base64 string'i binary'ye çevir
				const binaryString = atob(props.initialValues.fatura);
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				
				// Dosya türünü kontrol et ve uyarı ver
				const isValidFileType = validateFileType(new File([bytes], 'file', { type: 'application/octet-stream' }));
				if (!isValidFileType) {
					toast.error(getFileTypeErrorMessage());
					return;
				}
				
				// Blob oluştur ve yeni sekmede aç
				const blob = new Blob([bytes], { type: 'application/pdf' }); // PDF varsayılan
				const url = URL.createObjectURL(blob);
				window.open(url, '_blank');
				
				// URL'i temizle
				setTimeout(() => {
					URL.revokeObjectURL(url);
				}, 1000);
			} catch (error) {
				console.error("Dosya görüntüleme hatası:", error);
			}
		}
	};

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						bakimNedeni: BakimNedeniTipiListesi[0],
						parca: "",
						parcaAdedi: 0,
						parcaTutari: 0,
						iscilikTutari: 0,
						bakimAraligi: 0,
						aracGuncelKm: 0,
						fatura: "",
						aciklama: "",
						bakimOdeyenFirma: OdemeYapanFirmaListesi[5],
					}
				: {
						...props.initialValues,
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? bakimCreateSchema : bakimUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				let submitValue = { ...value };
				
				// Eğer dosya seçilmişse base64'e çevir
				if (selectedFile) {
					const base64String = await convertFileToBase64(selectedFile);
					submitValue = { ...submitValue, fatura: base64String };
				}

				if (mode === "create") {
					await createBakimMutation.mutateAsync(submitValue as CreateBakimRequest);
				} else if (mode === "update") {
					await updateBakimMutation!.mutateAsync(submitValue as Bakim);
				}
				await queryClient.invalidateQueries(
					getBakimlarByAracFiloIdQueryOptions(aracFiloId),
				);
				formApi.reset();
			} catch (_error) {}
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				close();
				form.reset();
			}}
		>
			<DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>
					{mode === "create" ? "Yeni Bakım Ekle" : "Seçili Bakımı Güncelle"}
				</DialogTitle>
				<DialogDescription>
					{mode === "create"
						? "Yeni bakım eklemek için formu eksiksiz doldurunuz"
						: "Seçili bakımı güncellemek için formu eksiksiz doldurunuz"}
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						<form.AppField name="bakimNedeni">
							{(field) => (
								<field.Select
									label="Bakim nedeni Tipi"
									values={bakimNedeniTipiOptions}
								/>
							)}
						</form.AppField>

						<form.AppField name="parca">
							{(field) => <field.TextField label="Parça" />}
						</form.AppField>

						<form.AppField name="parcaAdedi">
							{(field) => <field.TextField label="Parça Adedi" />}
						</form.AppField>

						<form.AppField name="parcaTutari">
							{(field) => <field.TextField label="Parça tutarı" />}
						</form.AppField>

						<form.AppField name="iscilikTutari">
							{(field) => <field.TextField label="İşçilik tutarı" />}
						</form.AppField>
					</div>

					<form.AppField name="bakimAraligi">
						{(field) => <field.TextField label="Bakım Aralığı (km)" />}
					</form.AppField>

					<form.AppField name="aracGuncelKm">
						{(field) => <field.TextField label="Araç Güncel Kilometre" />}
					</form.AppField>

					{/* Fatura Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="fatura">Fatura Dosyası</Label>
						
						{/* Mevcut fatura varsa göster */}
						{hasExistingFatura && !selectedFile && (
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Mevcut fatura dosyası mevcut</span>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={showExistingFatura}
									>
										<Eye className="h-4 w-4 mr-1" />
										Göster
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => {
											// Mevcut faturayı kaldır
											form.setFieldValue('fatura', '');
										}}
									>
										Kaldır
									</Button>
								</div>
							</div>
						)}
						
						<div className="flex items-center space-x-2">
							<Input
								id="fatura"
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
									const fileInput = document.getElementById('fatura') as HTMLInputElement;
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

					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>

					<form.AppField name="bakimOdeyenFirma">
						{(field) => (
							<field.Select label="Ödeyen Firma" values={bakimOdeyenOptions} />
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
									? createBakimMutation.isPending
									: updateBakimMutation!.isPending
							}
						>
							{mode === "create" ? (
								createBakimMutation.isPending
							) : updateBakimMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Bakım Ekle" : "Seçili Bakımı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
